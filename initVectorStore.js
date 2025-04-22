// initVectorStore.js

import dotenv from 'dotenv';
import { AstraDBVectorStore } from '@langchain/community/vectorstores/astradb';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: 'models/embedding-001',
});

async function initCollection() {
  await AstraDBVectorStore.fromTexts(
    ["test document 1", "test document 2"],
    [{ id: 1 }, { id: 2 }],
    embeddings,
    {
      token: process.env.ASTRA_DB_TOKEN,
      endpoint: process.env.ASTRA_DB_ENDPOINT,
      collection: "pdfdatacatalyst",
      vector: {
        dimension: 768, // Gemini output dimension
      },
    }
  );

  console.log("✅ Collection initialized with proper vector settings.");
}

initCollection().catch(console.error);