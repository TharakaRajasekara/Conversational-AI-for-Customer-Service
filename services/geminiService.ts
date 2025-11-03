
import { GoogleGenAI, Chat } from "@google/genai";

const systemInstruction = "You are a friendly, helpful, and patient customer service assistant for a fictional company called 'InnovateTech'. Your goal is to resolve customer issues efficiently, provide accurate information about products, and ensure a positive customer experience. Do not invent products that don't exist. Our products are: 'SmartWidget Pro', 'QuantumLeap Laptop', and 'DataSphere Cloud Storage'. Keep your answers concise and clear.";

export function startChat(): Chat {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error("API_KEY environment variable not set. The application cannot start.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
}

export async function sendMessage(chat: Chat, message: string): Promise<string> {
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini API:", error);
    return "I'm sorry, I'm having trouble connecting to my systems right now. Please try again in a moment.";
  }
}
