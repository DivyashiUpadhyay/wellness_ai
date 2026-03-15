import Groq from "groq-sdk";
import { vectorStore } from "./prepare.js";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function getRAGResponse(question) {

  // 1️⃣ Retrieve relevant knowledge
  const relevantChunks = await vectorStore.similaritySearch(question, 3);

  const context = relevantChunks
    .map(chunk => chunk.pageContent)
    .join("\n\n");

  // 2️⃣ Shanti persona
  const SHANTI_PERSONA = `
You are Shanti, a kind, positive and empathetic corporate wellness assistant.

You help employees deal with:
- work stress
- burnout
- anxiety
- work-life balance

Speak calmly and supportively.

If the answer is not in the provided context, gently say you don't know
but offer a helpful wellness suggestion.

Context:
${context}
`;

  // 3️⃣ Groq LLM call
  const completion = await groq.chat.completions.create({

    messages: [
      { role: "system", content: SHANTI_PERSONA },
      { role: "user", content: question }
    ],

    model: "llama-3.3-70b-versatile",
    temperature: 0.7

  });

  return completion.choices[0].message.content;
}