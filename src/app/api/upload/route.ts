import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

async function doIAStuff() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const prompt = 'How does AI work?';

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function GET() {
  const response = await doIAStuff();
  return NextResponse.json({ response });
}
