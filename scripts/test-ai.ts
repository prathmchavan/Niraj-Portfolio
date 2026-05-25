import { retrieveRelevantKnowledge } from "../src/lib/rag/retrieve";
import { streamRecruiterResponse } from "../src/lib/ai/generate";
import { calculateConfidence } from "../src/lib/recruiter/confidence";

async function main() {
  const recruiterQuestion =
    "Would this candidate be a good fit for a solutions engineering role?";

  const evidence =
    await retrieveRelevantKnowledge(
      recruiterQuestion,
      4
    );

  const confidence =
    calculateConfidence(
      evidence
    );

  const stream =
    await streamRecruiterResponse(
      recruiterQuestion,
      evidence,
      confidence
    );

  if (!stream) {
    console.log(
      "No response stream returned."
    );

    return;
  }

  const reader =
    stream.getReader();

  const decoder =
    new TextDecoder();

  let fullResponse = "";

  while (true) {
    const { done, value } =
      await reader.read();

    if (done) break;

    const chunk =
      decoder.decode(value);

    const lines = chunk
      .split("\n")
      .filter(Boolean);

    for (const line of lines) {
      try {
        const parsed =
          JSON.parse(line);

        if (parsed.response) {
          fullResponse +=
            parsed.response;
        }
      } catch (error) {
        console.error(
          "Parse error:",
          error
        );
      }
    }
  }

  console.log(
    "\n=== AI RESPONSE ===\n"
  );

  console.log(fullResponse);

  console.log(
    "\n=== EVIDENCE ===\n"
  );

  console.log(evidence);

  console.log(
    "\n=== CONFIDENCE ===\n"
  );

  console.log(`${confidence}%`);
}

main();