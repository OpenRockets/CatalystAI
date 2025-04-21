import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// LangChain & Gemini
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from 'langchain/schema/runnable';

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
