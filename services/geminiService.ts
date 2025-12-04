import { GoogleGenAI, Type } from "@google/genai";
import { GreetingResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLuxuryGreeting = async (name: string): Promise<GreetingResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a short, ultra-luxurious, sophisticated, and cinematic Christmas greeting for a person named "${name}". 
      The tone should be like a high-end fashion brand (e.g., Gucci, Cartier) wishing a holiday greeting. 
      It should be poetic, evoking gold, stars, and elegance.
      Max 2 sentences.
      Also provide a "signature" title for them (e.g., "The Golden Muse", "Distinguished Guest").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            greeting: { type: Type.STRING },
            signature: { type: Type.STRING }
          },
          required: ["greeting", "signature"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GreetingResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      greeting: "May your holidays be as timeless as gold and as deep as the emerald night.",
      signature: "Distinguished Guest"
    };
  }
};
