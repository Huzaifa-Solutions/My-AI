import type { ChatMessage } from '../types';

export const APP_NAME = 'Nexus AI';

export const GEMINI_MODEL = 'gemini-2.0-flash';

export const INITIAL_MESSAGE: ChatMessage = {
  role: 'model',
  text: "Hello! I'm your AI assistant. How can I help you today?",
};

export const SYSTEM_INSTRUCTION_WITH_CONTEXT = (context: string) =>
  `You are a highly intelligent, versatile, and helpful AI assistant. The user has provided the following document as context:
---
${context}
---
Use this context to answer questions if relevant, but you are also capable of answering any general questions, writing code, providing creative ideas, and more.
Be professional, clear, and thorough in your responses. Use Markdown for formatting.`;

export const SYSTEM_INSTRUCTION_DEFAULT =
  'You are a highly intelligent, versatile, and helpful AI assistant. You can answer any questions, write code, provide creative ideas, and help with various tasks. Be professional, clear, and thorough in your responses. Use Markdown for formatting.';
