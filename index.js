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

// LangChain Setup (Google Gemini model)
const chatModel = new ChatGoogleGenerativeAI({
  model: 'models/gemini-1.5-flash', // Use 1.5 Flash
  apiKey: process.env.GEMINI_API_KEY,
  maxOutputTokens: 256,
});

// Prompt Template
const promptTemplate = PromptTemplate.fromTemplate(
    `Generate a short, catchy 3–6 word **plain text** title summarizing this paragraph. Return **only** the title — no markdown, no bullets:\n\n"{text}"`
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
  

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: 'models/embedding-001', // Gemini 1.5 Flash supports this
  
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

    const combinedDocs = [...ConvertedLangChainChunks, ...ConvertedLangChainChapters].map((item, index) => {
      const isChunk = !!item.pageContent;
      const text = isChunk ? item.pageContent : item;
    
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
        metadata, // Embedded as an object
      };
    });
    
    const texts = combinedDocs.map(doc => doc.page_content);
    const vectors = await embeddings.embedDocuments(texts);
    
    const docsWithVectors = combinedDocs.map((doc, i) => ({
      ...doc,
      $vector: vectors[i], // Must use `$vector` for Astra DB vector search
    }));
    
    // 🔁 Insert into Astra DB
    (async () => {
      try {
        const result = await collection.insertMany(docsWithVectors);
        console.log("✅ Documents inserted successfully:", result);
      } catch (error) {
        console.error("❌ Error inserting documents:", error);
      }
    })();
    

    console.log("Prepared docs to insert:", combinedDocs);

    // Your working Astra insertMany logic
 

    console.log("✅ Inserted into Astra:");
    res.status(200).json({ message: 'Successfully saved data to Astra vector DB.' });
    const queryEmbedding = await embeddings.embedQuery('Sri Lanka');

    // Perform the vector search
    const cursor = collection
      .find({ "metadata.wordCount": { $ne: null }})
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







// const pageNumbers = topChunks.map(chunk => chunk.page);
// const topicDocs = await collection.find({ type: 'topic' });
// const prompt = `
// You are an assistant helping identify relevant topics for content chunks.

// Given the following CHUNKS:
// ${topChunks.map(c => `- ${c.text}`).join('\n')}

// And the following TOPICS:
// ${topicDocs.map(t => `- ${t.text}`).join('\n')}

// Pick the most appropriate topic that covers most or all of the above chunks. 

// Also, return the page numbers associated with the chunks: ${pageNumbers.join(', ')}.

// Be concise but clear.
// `;

// const geminiResponse = await sendToGemini(prompt); // you'll use your function to call Gemini here
// res.json({
//   answer: geminiResponse.text,
//   pageNumbers,
//   topic: geminiResponse.extractedTopic // or however you parse it
// });



































//use this code for debugging
/*import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// LangChain & Gemini
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { AstraDBVectorStore } from '@langchain/community/dist/vectorstores/astra';
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from 'langchain/schema/runnable';

const ASTRA_DB_COLLECTION = "pdfdatacatalyst"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// LangChain Setup (Google Gemini model)
const chatModel = new ChatGoogleGenerativeAI({
  model: 'models/gemini-1.5-flash', // Use 1.5 Flash
  apiKey: process.env.GEMINI_API_KEY,
  maxOutputTokens: 256,
});

// Prompt Template
const promptTemplate = PromptTemplate.fromTemplate(
    `Generate a short, catchy 3–6 word **plain text** title summarizing this paragraph. Return **only** the title — no markdown, no bullets:\n\n"{text}"`
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
  

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const embeddings = new GoogleGenerativeAIEmbeddings({
  modelName: "models/embedding-001",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function handleUserQuery(userQuery) {
  // Connect to Astra Vector Store
  const vectorStore = await AstraDBVectorStore.fromExistingIndex(embeddings, {
    collectionName: ASTRA_DB_COLLECTION,
    token: process.env.ASTRA_DB_TOKEN,
    endpoint: process.env.ASTRA_DB_ENDPOINT,
  });

  // Embed query
  const embeddedQuery = await embeddings.embedQuery(userQuery);

  // Retrieve related chunks
  const chunkResults = await vectorStore.similaritySearchVectorWithScore(embeddedQuery, 4, {
    filter: { type: "chunk" },
  });

  // Retrieve related topics
  const topicResults = await vectorStore.similaritySearchVectorWithScore(embeddedQuery, 2, {
    filter: { type: "topic" },
  });

  const formattedPrompt = `
User question: "${userQuery}"

Here are the PDF content chunks:
${chunkResults.map(
  (r, i) => `Chunk ${i + 1} (Page ${r.metadata.pageNumber}):\n${r.pageContent}`
).join("\n\n")}

Here are the related topics:
${topicResults.map((r, i) => `Topic ${i + 1}: ${r.pageContent}`).join("\n\n")}

Using the information above, answer the question clearly. Mention the page number and topic if possible.
`;

  const response = await chatModel.call([
    ["human", formattedPrompt],
  ]);

  return {
    answer: response.content,
    page: chunkResults[0]?.metadata?.pageNumber,
    topic: topicResults[0]?.pageContent,
  };
}
app.post('/upload-pdf-data', async (req, res) => {
  const { pdfChunks = [], chatTopics = [] } = req.body;

  // ✅ Check that both are arrays
  if (!Array.isArray(pdfChunks) || !Array.isArray(chatTopics)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid input format. Expected "pdfChunks" and "chatTopics" to be arrays.',
    });
  }

  try {
    const vectorStore = await AstraDBVectorStore.fromExistingIndex(embeddings, {
      collectionName: ASTRA_DB_COLLECTION,
      token: process.env.ASTRA_DB_TOKEN,
      endpoint: process.env.ASTRA_DB_ENDPOINT,
    });

    const documents = [];

    // 🧩 PDF Chunks — embed as 'chunk'
    for (const chunk of pdfChunks) {
      documents.push({
        pageContent: chunk.text,
        metadata: {
          ...chunk.metadata,
          type: "chunk",
        },
      });
    }

    // 🧠 Chat Topics — embed as 'topic'
    for (const topic of chatTopics) {
      documents.push({
        pageContent: topic.chapterName, // Or topic.title
        metadata: {
          ...topic.metadata,
          type: "topic",
        },
      });
    }

    await vectorStore.addDocuments(documents);

    res.json({ success: true, message: `${documents.length} documents uploaded.` });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, error: 'Upload failed.' });
  }
});
app.post('/ask', async (req, res) => {
  const { userQuery } = req.body;

  try {
    const response = await handleUserQuery(userQuery);
    res.json(response); // send back { answer, page, topic }
  } catch (error) {
    console.error('Error handling query:', error);
    res.status(500).json({ error: 'Failed to process user query' });
  }
}); */