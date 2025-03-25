'use server';

import { GoogleGenerativeAI, Part } from '@google/generative-ai';

export async function extractData(file: File) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const mimeType = file.type;
  const fileBuffer = await file.arrayBuffer();
  const base64Data = Buffer.from(fileBuffer).toString('base64');

  const parts: Part[] = [
    {
      text: `The attached document contains documents which include student ID document, certificates, etc. 
      I need you to extract information from the ID and the LGCSE certificates. 
      From the ID return the ID number, gender, surname and first name. 
      From the LGCSE certificates return the subject and grade.`,
    },
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
