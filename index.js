import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { AstraDBVectorStore } from '@langchain/community/vectorstores/astradb';
import { DataAPIClient, DEFAULT_KEYSPACE } from '@datastax/astra-db-ts';
// LangChain & Gemini
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from '@langchain/core/runnables';

const ASTRA_DB_COLLECTION = "history_data"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, './public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


const chatModel = new ChatGoogleGenerativeAI({
  model: 'models/gemini-1.5-flash', // Use 1.5 Flash
  apiKey: process.env.GEMINI_API_KEY,
  maxOutputTokens: 1000,
});


const promptTemplate = PromptTemplate.fromTemplate(
    `Generate a short, catchy 3–4 word **plain text** title summarizing this paragraph. Return **only** the title — no markdown, no bullets:\n\n"{text}"`
  );


// Chain
const titleChain = RunnableSequence.from([
  {
    text: (input) => input.textC, // Input mapping
  },
  promptTemplate,
  chatModel,
]);

// Endpoint
app.post('/generate-title', async (req, res) => {
    const { textC } = req.body;
  
    try {
      const result = await titleChain.invoke({ textC });
      console.log("📩 Received AI response:", result);
  
      // Extract clean title from AIMessage content
      const content = result?.content || '';
      const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  
      // Prefer first line or first markdown bullet if present
      let title = lines[0] || 'Untitled Chat';
      if (title.startsWith('*')) {
        title = title.replace(/^\*\*?/, '').replace(/\*\*?$/, '').trim();
      }
  
      // Limit to 60 characters (your original check)
      if (title.length > 60 || title.length === 0) {
        title = 'Untitled Chat';
      }
  
      res.json({ title });
  
    } catch (error) {
      console.error('LangChain + Gemini Error:', error);
      res.status(500).json({ title: 'Untitled Chat' });
    }
  });
  


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: 'models/embedding-001', // Gemini 1.5 only in comp
  
});
(async () => {
  const test3353 = await embeddings.embedQuery("Test vector");
  console.log("Vector length:", test3353.length);
})();
(async () => {
  try {
    const test3353 = await embeddings.embedQuery("Test vector");
    console.log("Vector length:", test3353.length); // should be 768
    
    
  } catch (err) {
    console.error("💥 Startup vector init error:", err);
  }
})();
const client = new DataAPIClient('AstraCS:pGtxJJbbJAZOiLOblLNMjXbu:0b1551c5fcf8b10d013037c597bc364216e3dfd6c4544fd67067c71174889cd8');
const db = client.db('https://dd79574f-3cc5-4f84-978b-7b14572a051b-us-east-2.apps.astra.datastax.com');
const collection = db.collection('History_data');
app.post('/upload', async (req, res) => {
  try {
    const { ConvertedLangChainChunks, ConvertedLangChainChapters } = req.body;
    console.log("📥 Incoming data:", JSON.stringify(req.body, null, 2));

    if (!ConvertedLangChainChunks || !ConvertedLangChainChapters) {
      return res.status(400).json({ error: 'Both chunks and topics are required.' });
    }
    await collection.deleteMany({});
     console.log("🧹 Cleared existing collection before inserting new documents.");
    const combinedDocs = [...ConvertedLangChainChunks, ...ConvertedLangChainChapters].map((item, index) => {
      const isChunk = item.metadata?.wordCount !== null && item.metadata?.wordCount !== undefined;
    
      const text = item.pageContent;
    
      const metadata = {
        type: isChunk ? "chunk" : "topic",
      };
    
      if (isChunk) {
        metadata.pageNumber = item.metadata?.pageNumber || null;
        metadata.wordCount = item.metadata?.wordCount || null;
        metadata.chunkKey = `chunk-${index}`;
      } else {
        metadata.section = item.metadata?.section || `section-${Math.floor(index / 5)}`;
      }
    
      return {
        page_content: text,
        metadata,
      };
    });
    
    const texts = combinedDocs.map(doc => doc.page_content);
    const vectors = await embeddings.embedDocuments(texts);
    
    const docsWithVectors = combinedDocs.map((doc, i) => ({
      ...doc,
      $vector: vectors[i], // Must use `$vector` for Astra DB vector search
    }));
    
    
    (async () => {
      try {
        
        const result = await collection.insertMany(docsWithVectors);
        console.log("✅ Documents inserted successfully:", result);
      } catch (error) {
        console.error("❌ Error inserting documents:", error);
      }
    })();
    

    console.log("Prepared docs to insert:", combinedDocs);


 

    console.log("✅ Inserted into Astra:");
    res.status(200).json({ message: 'Successfully saved data to Astra vector DB.' });
    const queryEmbedding = await embeddings.embedQuery('Sri Lanka');

    // Perform the vector search
    const cursor = collection
      .find({ "metadata.type": "chunk"})
      .sort({ $vector: queryEmbedding }) 
      .includeSimilarity(true)
      .limit(3);
    
    // Retrieve the results
    const results = await cursor.toArray();
    console.log(results);


    

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload data to Astra.' });
  }
});

////////////////////////////////////////////////////////////////////////////
const generalChatSeq = PromptTemplate.fromTemplate(
 `
    You are a helpful and highly structured AI assistant. When responding to a user's query, follow these formatting rules **strictly**:
    
      INTRO LINE:
    - Write a very short (3 or 4 words) **creative thinking state** phrase at the very beginning on a new line, wrapped like [[Thinking deeply...]]. DO NOT use any HTML tags for this line.
    
      FORMAT THE MAIN RESPONSE USING:
    - Use <br> tags BEFORE starting each new subtopic or to separate paragraphs for clarity.
    - DO NOT use <p>, <ol>, <ul>, <b>, <i>, or any other styling/class-based HTML tags.
    
      ACCURACY & BREVITY:
    - Keep the response **accurate, not overly long**.
    - Focus on **real-world clarity**, **relevance**, and **examples** over verbosity.
    
      HTML INTEGRATION:
    - Wrap all proper nouns (people, companies, countries, animals, trees, buildings, etc.) inside <span> tags.
      Example: <span>Colombo</span>
    - You MUST include **at least one <a href="...">...</a>** HTML link to a source or related article.
      If no specific link exists, use a placeholder like:
      <a href="https://en.wikipedia.org/wiki/Colombo">Learn more about <span>Colombo</span></a>
    
      CONTENT STRUCTURE:
    - Insert <br> between logically distinct sections to enhance readability.
    - Avoid jammed or overly compressed output—give space and structure.
    
    User Question:
    {responseXForm}
    `    
  );
  

const generalChatHandle = RunnableSequence.from([
  generalChatSeq,
  chatModel,
]);
// Endpoint
app.post('/general-postG', async (req, res) => {
  const { responseXForm } = req.body;

  try {
    const result = await generalChatHandle.invoke({ responseXForm });

    const content = result?.content || '';

    // 🧠 Extract state message from [[...]]
    const stateMatch = content.match(/\[\[(.*?)\]\]/);
    const stateX = stateMatch ? stateMatch[1] : 'Generating...';

    // 🧽 Clean the rest of the content after removing [[...]]
    const cleanContent = content.replace(/\[\[.*?\]\]\s*/, '');
    const resultX = cleanContent || 'Untitled Chat';

    if (resultX.startsWith('*')) {
      resultX = resultX.replace(/^\*\*?/, '').replace(/\*\*?$/, '').trim();
    }
    console.log("🧪 Cleaned resultX:", resultX);
    // 🚀 Respond with both result and state
    res.json({ resultX, stateX });

  } catch (error) {
    console.error('LangChain + Gemini Error:', error);
    res.status(500).json({ resultX: 'Untitled Chat', stateX: 'Idle' });
  }
});

//DeepThink EX-TOKN01
const deepChatSeq = PromptTemplate.fromTemplate(
  `You are a highly precise assistant designed to provide **deep, structured, and readable** insights.

The user will provide:
1. {actTextRet}: the base content to be expanded or explored further.
2. {intenseRet}: the depth or intensity level requested for the analysis.

You must follow these STRICT FORMATTING RULES:

🔧 STRUCTURE:
- Start with a concise one-line summary or intro sentence if needed.
- Then break down the analysis into clear bullet points for each idea, insight, or fact.
- When the {intenseRet} increses, and 1000 means maximum intensity of the detailing. 

🧱 FORMATTING
- Use <br> tags ONLY to separate paragraphs within a point. before and after.
- Each subtopic must contain inside <b> tags. for enhanced clarity. <b> tags must be used to highlight the subtopics
- DO NOT use <ol>, <ul>, <a>, <p>, <b>, <i>, or any other tags.
- Wrap proper nouns (names of people, companies, countries, animals, books, scientific terms, etc.) with <span> tags.
- Never start bullet points with symbols like * or -.
- Make sure all content is readable, well-spaced, and not jammed together.

📌 CLARITY REQUIREMENTS:
- Add line breaks using <br> between logical segments to enhance readability.
- Provide deeper insights based on the intensity level given ({intenseRet}).

 🔍 ACCURACY & BREVITY:
- Keep the response **accurate and structured**, not overly long or bloated.
- Focus on **real-world clarity**, **relevance**, and **examples** over verbosity.
- Adjust the level of detail according to the value of {intenseRet}:
  - A higher value (e.g., 1000) means **maximum depth**, **technical detail**, and **insight**.
  - A lower value should result in **simpler**, more **general** explanations.
  
📎 CONTEXTUALITY:
- Never go off-topic from the original text ({actTextRet}).
- Do NOT hallucinate or make up unrelated details.

Begin your expanded and formatted response below:
`
);
const deepChatHandle = RunnableSequence.from([
  deepChatSeq,
  chatModel,
]);


// Endpoint
app.post('/deep-search', async (req, res) => {
  const { actTextRet, intenseRet } = req.body;
  console.log(actTextRet);
  
  try {
    const formattedPrompt = await deepChatSeq.format({
      actTextRet,
      intenseRet,
    });

    const result = await chatModel.invoke(formattedPrompt);


    const content = result?.content || '';
    const cleanContent = content.replace(/\[\[.*?\]\]/, '').trim();

    res.json({ deepResponse: cleanContent });

  } catch (error) {
    console.error('LangChain + Gemini Error:', error);
    res.status(500).json({ deepResponse: 'Deep Search failed.' });
  }
});



app.post('/upload_deepdoc', async (req, res) => {
  try {
    const { actTextRet, intenseRet, instructionR } = req.body;
    if (!actTextRet || !intenseRet || !instructionR) {
      return res.status(400).json({ error: 'actTextRet, intenseRet, and instructionR are required.' });
    }

    const queryEmbedding = await embeddings.embedQuery(actTextRet);

    const cursor = collection
      .find({ "metadata.type": "chunk" })
      .sort({ $vector: queryEmbedding })
      .includeSimilarity(true)
      .limit(10);

    const results = await cursor.toArray();

    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'No similar results found.' });
    }

    const formattedChunks = results.map(doc => ({
      content: doc.page_content,
      page: doc.metadata?.pageNumber || "N/A",
    }));

    const similarityScores = results.map(doc => doc.$similarity || 0);
    const avgSimilarity = similarityScores.reduce((sum, val) => sum + val, 0) / similarityScores.length;


    const geminiResponse = await handleDeepResponse(formattedChunks, intenseRet, instructionR, actTextRet);

    res.status(200).json({
      deepResponse: geminiResponse,
      similarityAverage: avgSimilarity.toFixed(4),
    });

  } catch (err) {
    console.error('🔴 Deep Search Error:', err);
    res.status(500).json({ error: 'Failed to complete deep search.' });
  }
});

async function handleDeepResponse(formattedChunks, intenseRet, instructionR, actTextRet) {
  console.log("🧠 Generating Gemini response...");

  const chunkInput = formattedChunks.map(chunk => {
    return `${chunk.content} <span>Page ${chunk.page}</span>`;
  }).join('\n\n');

  let systemPrompt;

  if (instructionR.toLowerCase() === "question") {
    systemPrompt = `
You are a creative question generator trained to help users analyze content deeply by asking the right questions.

📘 Context:
- You are given 10 content chunks.
- Each chunk has a page number.

🧠 USER INTENT ALIGNMENT:
- The questions must be directly relevant to the user's request: **{actTextRet}**.
- Use this to guide your questioning.
- Do NOT include off-topic, overly general, or irrelevant queries.

🧱 FORMAT & STRUCTURE RULES:
- Do NOT use <ol>, <ul>, <p>, <i>, or <a> tags.
- Use <br> tags ONLY for question ends.
- Use <b> to highlight keywords in questions
- Wrap all proper nouns in <span> tags.
- Each statement must END with the actual <span>Page ...</span> value already embedded in the content.
- Only use the content given. Do NOT hallucinate.
- Adjust detail level based on {intenseRet} (0-1000).

❓ Questioning Instructions:
- Ask insightful, analytical questions based only on the {actTextRet} .
- Wrap any referenced proper nouns (e.g. names, companies, terms) in <span> tags.
- Do NOT hallucinate or make up content.
- Do NOT answer the questions, just ask them.
- Each question must end with the corresponding <span>Page...</span> value already embedded in the content.

📘 Content:
{chunkInput}

Now begin generating thoughtful questions:
    `;
  } else {
    systemPrompt = `
You are a highly precise assistant designed to provide **deep, structured, and readable** insights.

🧠 Input Details:
- You are given 10 content chunks extracted from documents.
- Each has a content and a page number.

🧱 FORMAT & STRUCTURE RULES:
- Do NOT use <ol>, <ul>, <p>, <i>, or <a> tags.
- Use <br> tags ONLY for paragraph breaks.
- Use <b> to highlight subtopics.
- Wrap all proper nouns in <span> tags.
- Each statement must END with the actual <span>Page ...</span> value already embedded in the content.
- Only use the content given. Do NOT hallucinate.
- Adjust detail level based on {intenseRet} (0-1000).

📘 Content Chunks:
{chunkInput}

🔥 Intensity Level: {intenseRet}

Now begin your structured response:
`;

  }

  const deepDocSeq = PromptTemplate.fromTemplate(systemPrompt);

  const formattedPrompt = await deepDocSeq.format({
    chunkInput,
    intenseRet,
    actTextRet
  });

  const result = await chatModel.invoke(formattedPrompt);
  const content = result?.content || '';
  const cleanContent = content.replace(/\[\[.*?\]\]/, '').trim();

  return cleanContent;
}

////////////////// The Normal Docxument text retrieval 

app.post('/doc-postG', async (req, res) => {
  const { responseXForm } = req.body;

  try {
    
    const queryEmbedding = await embeddings.embedQuery(responseXForm);

  
    const chunkCursor = collection
      .find({ "metadata.type": "chunk" })
      .sort({ $vector: queryEmbedding })
      .includeSimilarity(true)
      .limit(4);

    const chunkResults = await chunkCursor.toArray();

    if (!chunkResults.length) {
      return res.status(404).json({ error: 'No related content chunks found.' });
    }

    const chunkDta = chunkResults.map(doc =>
      `${doc.page_content}<br><span>Page ${doc.metadata?.pageNumber || 'N/A'}</span>`
    ).join('\n\n');

  
    const topicCursor = await collection
      .find({ "metadata.type": "topic" });

    const topicResults = await topicCursor.toArray();
    const topicDta = topicResults.map(t => t.page_content).join(', ');

    
    const { stateX, resultX } = await handleDocGemini(chunkDta, topicDta, responseXForm);

    console.log("📄 Gemini Final Output:", resultX);

    res.json({ stateX, resultX });

  } catch (error) {
    console.error('❌ doc-postG Error:', error);
    res.status(500).json({ stateX: 'Error', resultX: 'An error occurred while processing your request.' });
  }
});
// Gemini Prompt Template for doc-postG
const docChatSeq = PromptTemplate.fromTemplate(`
  You are a highly precise assistant designed to provide **deep, structured, and readable** insights.

  🧠 Input Details:
  - You are given 4 content chunks extracted from documents.
  - Each chunk includes content and a page number already wrapped in <br><span>Page ...</span>.
  - The original user query is: {responseXForm}

  🧱 FORMAT & STRUCTURE RULES:
  - Do NOT use <ol>, <ul>, <p>, <i>, or <a> tags.
  - Use <br> tags ONLY for paragraph breaks and BEFORE every <span> tag.
  - Use <b> to highlight subtopics.
  - Wrap all proper nouns in <span> tags.
  - Each statement must END with <br><span>Page ...</span> from the source.
  - At the end of each point, include the most matching topic from {topicDta} inside <br><span>**Topic**</span>.
  - Use CHAPTER headings for each matching topic as: <br><b>CHAPTER: Topic Name</b>
  - Only use the content given. Do NOT hallucinate.
  - Start by answering {responseXForm} with the **most relevant** content from {chunkDta}.
  - After answering directly, elaborate with additional relevant points that align with the query using proper formatting.
  - Construct responses by aligning related content for the best answer(s) across chunks. Do not mix unrelated content. Keep each paragraph coherent and based on user intent.
  
  📘 Content Chunks:
  {chunkDta}

  🔥 topicChunks: {topicDta}

  Now begin your structured response:
`);

  
  
  const docChatHandle = RunnableSequence.from([
    docChatSeq,
    chatModel,
  ]);
  
  // Gemini Handler Function
  async function handleDocGemini(chunkDta, topicDta, responseXForm) {
    const result = await docChatHandle.invoke({
      chunkDta,
      topicDta,
      responseXForm
    });
  
    const content = result?.content || '';
    const stateMatch = content.match(/\[\[(.*?)\]\]/);
    const stateX = stateMatch ? stateMatch[1] : 'Generating...';
    const cleanContent = content.replace(/\[\[.*?\]\]\s*/, '').trim();
    return { stateX, resultX: cleanContent };
  }
  
// Endpoint
  

//Endover--------Deepsearch

 const summerySys = PromptTemplate.fromTemplate(`
  You are an intelligent academic analyzer. A user has uploaded a document and interacted with a chatbot (you) to learn from it.  
   You are given: - The total number of words in the uploaded document: {noWords} - All the questions the user asked: {finalityNumberOfResponsesUser} - All the responses the chatbot gave: {finalityNumberOfResponsesBot}  
  Your task is to:
  1. Analyze the user queries and the bot responses together to determine how many **unique academic or topic-relevant words** are present. 
  2. Guess, based on context, how likely it is that each word came from the original document. Use smart judgment — you don’t need to be exact, just use strong logical deduction. 
  3. Calculate the percentage of words that reflect content or ideas likely covered in the original document (compared to {noWords}). 
  4. Output **only the final percentage** (e.g., “68%”) — no explanation, no sentence — just the number followed by a percentage sign. 
  5. Think deeply, and don’t just match words — consider the meaning, importance, and relevance of each point in relation to the document.  This percentage should represent **how much of the original document has likely been covered through this conversation**. `);  
const summerySysHandle = RunnableSequence.from([
  deepChatSeq,
  chatModel,
]);


// Endpoint
app.post('/summery-e', async (req, res) => {
  const {  noWords, finalityNumberOfResponsesBot, finalityNumberOfResponsesUser  } = req.body;
  console.log('no of words 😁😁', noWords);
  
  try {
    const formattedPrompt = await summerySys.format({
      noWords,
      finalityNumberOfResponsesBot,
      finalityNumberOfResponsesUser

    });

    const result = await chatModel.invoke(formattedPrompt);


    const content = result?.content || '';
    console.log(content);
    res.json({ sumryX: content });

  } catch (error) {
    console.error('LangChain + Gemini Error:', error);
    res.status(500).json({ sumryX: 'Summerizing failed.' });
  }
});























