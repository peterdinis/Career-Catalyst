import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn(
        'GEMINI_API_KEY is not set. AI features will use mock responses.'
    );
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateWithGemini(prompt: string): Promise<string> {
    if (!genAI) {
        throw new Error('Gemini API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
}

export function isGeminiConfigured(): boolean {
    return !!apiKey;
}
