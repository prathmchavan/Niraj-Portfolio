import { retrieveRelevantKnowledge } from "../src/lib/rag/retrieve";
import { generateRecruiterResponse } from "../src/lib/ai/generate";

async function main() {
  const recruiterQuestion =
    "Would this candidate be a good fit for a solutions engineering role?";

  const evidence =
    await retrieveRelevantKnowledge(
      recruiterQuestion,
      4
    );

  const response =
    await generateRecruiterResponse(
      recruiterQuestion,
      evidence
    );

  console.log("\n=== AI RESPONSE ===\n");

  console.log(response);
}

main();