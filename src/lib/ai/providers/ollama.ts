import { AIMessage, GenerateOptions } from "../types";

export async function generateWithOllama(
  messages: AIMessage[],
  options?: GenerateOptions
) {
  const response = await fetch(
    "http://localhost:11434/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        messages,
        stream: false,
        options: {
          temperature: options?.temperature ?? 0.3,
        },
      }),
    }
  );

  const data = await response.json();

  return data.message.content;
}