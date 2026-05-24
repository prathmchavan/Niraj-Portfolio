import { retrieveRelevantKnowledge } from "../src/lib/rag/retrieve";

async function main() {
  const results = await retrieveRelevantKnowledge(
    "Does the candidate have workflow automation experience?"
  );

  console.log(JSON.stringify(results, null, 2));
}

main();