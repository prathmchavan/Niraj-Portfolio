import fs from "fs";
import path from "path";

function scoreTextMatch(
  query: string,
  text: string
) {
  const queryWords = query
    .toLowerCase()
    .split(" ");

  const textLower = text.toLowerCase();

  let score = 0;

  for (const word of queryWords) {
    if (textLower.includes(word)) {
      score += 3;
    }
  }

  return score;
}

export async function retrieveRelevantKnowledge(
  query: string,
  topK: number = 5
) {
  const knowledgePath = path.join(
    process.cwd(),
    "src/data/embeddings/knowledge.json"
  );

  const rawKnowledge =
    fs.readFileSync(knowledgePath, "utf-8");

  const knowledge = JSON.parse(rawKnowledge);

  const scoredResults = knowledge.map(
    (item: any) => {
      const combinedText = `
  ${item.metadata.title || ""}
  ${item.metadata.summary || ""}

  ${(item.metadata.capabilities || []).join(" ")}

  ${(item.metadata.domains || []).join(" ")}

  ${(item.metadata.businessImpact || []).join(" ")}

  ${(item.metadata.technicalChallenges || []).join(" ")}

  ${JSON.stringify(
    item.metadata.roleAlignment || {}
  )}

  ${(item.metadata.technologies || []).join(" ")}

  ${item.metadata.embeddingText || ""}
`;

      const score = scoreTextMatch(
        query,
        combinedText
      );

      return {
        score,
        metadata: item.metadata,
      };
    }
  );

  const ranked = scoredResults.sort(
    (a: any, b: any) => b.score - a.score
  );

  return ranked.slice(0, topK);
}