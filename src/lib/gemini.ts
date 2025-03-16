import { createGoogleGenerativeAI } from "@ai-sdk/google";

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
}

export function getGeminiModelName() {
  return process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL;
}

export function getGeminiProvider() {
  const apiKey = getGeminiApiKey();

  if (!apiKey) {
    throw new Error("Missing Gemini API key. Add GEMINI_API_KEY to your .env file.");
  }

  return createGoogleGenerativeAI({ apiKey });
}
