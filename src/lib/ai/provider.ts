export async function generateAIResponse(
  prompt: string,
  evidence: any[],
  confidence: number
) {
  const provider =
    process.env.AI_PROVIDER;

  console.log(
    "AI PROVIDER:",
    provider
  );

  // -----------------------------------
  // LOCAL OLLAMA
  // -----------------------------------

  if (provider === "local") {
    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          model: "llama3",
          prompt,
          stream: false,
        }),
      }
    );

    const data =
      await response.json();

    const text =
      data.response || "No response";

    const encoder =
      new TextEncoder();

    return new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              response: text,
              evidence,
              confidence,
            }) + "\n"
          )
        );

        controller.close();
      },
    });
  }

  // -----------------------------------
  // GROQ
  // -----------------------------------

  if (provider === "groq") {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          model:
            "openai/gpt-oss-120b",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.2,

          stream: false,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        `AI request failed: ${data.error?.message || response.statusText}`
      );
    }

    console.log(
      "GROQ RESPONSE:",
      data
    );

    const text =
      data.choices?.[0]?.message
        ?.content || "No response";

    const encoder =
      new TextEncoder();

    return new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              response: text,
              evidence,
              confidence,
            }) + "\n"
          )
        );

        controller.close();
      },
    });
  }

  throw new Error(
    "Invalid AI_PROVIDER"
  );
}