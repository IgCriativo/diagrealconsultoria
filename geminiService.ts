
import { GoogleGenAI } from "@google/genai"; // Keep import for structure, though not used for core logic now
import { API_KEY } from '../constants';
import { MaturityLevel } from "../types"; // MaturityLevel might be used if we re-introduce AI feedback

// Ensure API_KEY is configured. This is a critical step.
if (!API_KEY) {
  console.error("API_KEY não configurada. Verifique suas variáveis de ambiente.");
  // App.tsx will handle showing an error view based on API_KEY presence
}

// Initialize AI for potential future use (e.g. if we want AI to comment on results)
// const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// The core diagnostic logic (questions, scoring, feedback) is now defined in constants.ts
// and applied directly in App.tsx or a dedicated local service.
// The Gemini API is not being called for the primary diagnosis in this iteration
// as per the requirement for the IA (assistant) to define the logic.

// Example of a placeholder function if we wanted to add AI-driven insights later:
/*
export interface GeminiSupplementaryInsight {
  insightText: string;
}

export async function getSupplementaryInsight(
  moduleResults: ModuleAssessmentResult[]
): Promise<GeminiSupplementaryInsight | null> {
  if (!ai) {
    console.warn("Gemini AI not initialized, skipping supplementary insight.");
    return null;
  }

  const prompt = `
    Analisando os seguintes resultados de um diagnóstico de maturidade empresarial:
    ${moduleResults.map(r => `${r.module}: ${r.maturityLevel} (${r.feedback})`).join('\n')}
    Forneça um breve insight complementar (1-2 frases) que um consultor poderia oferecer.
    Responda em JSON: { "insightText": "seu insight aqui" }
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17", // or other suitable model
        contents: prompt,
        config: { responseMimeType: "application/json", temperature: 0.5 }
    });
    let jsonStr = response.text.trim();
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }
    return JSON.parse(jsonStr) as GeminiSupplementaryInsight;
  } catch (error) {
    console.error("Erro ao obter insight suplementar com Gemini API:", error);
    return null;
  }
}
*/

// For now, this service primarily serves as a placeholder for Gemini SDK initialization
// and API key validation check, which is handled by App.tsx reading the exported API_KEY.
// No direct exportable function for diagnosis is needed from here if logic is in constants/App.
