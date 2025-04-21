import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();


// POST endpoint to receive text and return summarized title

import { fileURLToPath } from 'url';
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate-title', async (req, res) => {
    const { textC } = req.body;

    const prompt = `Generate a short, 3–6 word title that summarizes the following paragraph:\n\n"${textC}"`;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const title = response.text().trim();

        if (title && title.length > 0 && title.length < 60) {
            res.json({ title });
        } else {
            res.json({ title: 'Untitled Chat' });
        }

    } catch (error) {
        console.error('Gemini Error:', error);
        res.status(500).json({ title: 'Untitled Chat' });
    }
});
