import { GoogleGenAI, Type } from '@google/genai';
import type { MeetingAgenda } from '../types';
import {
  GEMINI_MODEL,
  SYSTEM_INSTRUCTION_DEFAULT,
  SYSTEM_INSTRUCTION_WITH_CONTEXT,
} from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

export async function generateAgendaFromText(text: string): Promise<MeetingAgenda> {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: `Analyze the following document and generate a structured meeting agenda.
Identify the meeting title, key stakeholders, and a list of topics to cover.
For each topic, estimate a reasonable duration in minutes and provide a brief description.

Document Content:
${text}`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          date: { type: Type.STRING },
          stakeholders: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                topic: { type: Type.STRING },
                duration: { type: Type.NUMBER },
                description: { type: Type.STRING },
                stakeholders: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['id', 'topic', 'duration', 'description', 'stakeholders'],
            },
          },
        },
        required: ['title', 'date', 'stakeholders', 'items'],
      },
    },
  });

  return JSON.parse(response.text ?? '{}');
}

export async function chatWithGemini(
  history: { role: string; parts: { text: string }[] }[],
  message: string,
  context?: string
): Promise<string> {
  const systemInstruction = context
    ? SYSTEM_INSTRUCTION_WITH_CONTEXT(context)
    : SYSTEM_INSTRUCTION_DEFAULT;

  // Ensure history starts with a user message (skip initial bot greeting)
  const firstUserIdx = history.findIndex((h) => h.role === 'user');
  const validHistory = firstUserIdx >= 0 ? history.slice(firstUserIdx) : [];

  const chat = ai.chats.create({
    model: GEMINI_MODEL,
    config: { systemInstruction },
    history: validHistory,
  });

  const response = await chat.sendMessage({ message });
  return response.text ?? "I'm sorry, I couldn't process that.";
}
