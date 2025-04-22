import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { AstraDBVectorStore } from '@langchain/community/vectorstores/astradb';
// LangChain & Gemini
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from '@langchain/core/runnables';

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
  apiKey: process.env.GEMINI_API_KEY,
  modelName: 'models/embedding-001', // Gemini 1.5 Flash supports this
});

await AstraDBVectorStore.fromTexts(
  ["This is a sample."],
  [{ source: "init" }],
  embeddings,
  {
    token: process.env.ASTRA_DB_TOKEN,
    endpoint: process.env.ASTRA_DB_ENDPOINT,
    collection: "pdfdatacatalyst",
    vector: {
      dimension: 768
    }
  }
);
async function getVectorStore() {
  return await AstraDBVectorStore.fromExistingIndex(embeddings, {
    token: process.env.ASTRA_DB_TOKEN,
    endpoint: process.env.ASTRA_DB_ENDPOINT,
    collection: ASTRA_DB_COLLECTION, // <-- correct key
  });
}
app.post('/upload', async (req, res) => {
  try {
    const { ConvertedLangChainChunks, ConvertedLangChainChapters } = req.body;
    console.log("📥 Incoming request body:", JSON.stringify(req.body, null, 2));//checking
    if (!ConvertedLangChainChunks || !ConvertedLangChainChapters) {
      return res.status(400).json({ error: 'Chunks and topics are required.' });
    }

    const docs = [...ConvertedLangChainChunks, ...ConvertedLangChainChapters].map((item, i) => {
  const text = typeof item === 'string' ? item : item.content || ''; // Safely get text from object
  console.log(text);
  console.log("🔍 Raw item:", item);
  return {
    pageContent: text,
    metadata: {
      chunkKey: `chunk-${i}`,
      section: `section-${Math.floor(i / 5)}`,
    },
  };
  
});
    const vectorStore = await getVectorStore();
    await vectorStore.addDocuments(docs);

    res.status(200).json({ message: 'Successfully uploaded chunks and topics to AstraDB.' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload data to AstraDB.' });
  }
});
app.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required.' });
    }

    const vectorStore = await getVectorStore();

    // Perform semantic search on the vector store
    const results = await vectorStore.similaritySearch(query, 5);  // Adjust the number of results as needed

    // Map the results to include metadata and content
    const output = results.map(r => ({
      pageContent: r.pageContent,
      pageNumber: r.metadata?.pageNumber || null,
      chunkKey: r.metadata?.chunkKey || null,
      section: r.metadata?.section || null,
      topic: r.metadata?.chapterKey || null,
    }));

    res.json(output); // Send the results back to the frontend
    console.log(output);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed.' });
  }
});





































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