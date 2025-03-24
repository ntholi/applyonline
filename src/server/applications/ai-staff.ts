'use server';

import { GoogleGenerativeAI, Part } from '@google/generative-ai';

export async function extractData(file: File) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const mimeType = file.type;
  const fileBuffer = await file.arrayBuffer();
  const base64Data = Buffer.from(fileBuffer).toString('base64');

  const parts: Part[] = [
    { text: 'Extract all text from this image:' },
    {
      inlineData: {
        mimeType,
        data: base64Data,
      },
    },
  ];
  const result = await model.generateContent(parts);
  return result.response.text();
}
