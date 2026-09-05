import fs from "fs";
import path from "path";

import { generateEmbedding } from "./embed";
import { cosineSimilarity } from "./cosine";

type KnowledgeItem = {
  id: string;
  type: string;
  embedding: number[];
  metadata: any;
};

function keywordScore(
  query: string,
  text: string
) {
  const queryWords =
    query
      .toLowerCase()
      .split(/\s+/);

  const textLower =
    text.toLowerCase();

  let score = 0;

  for (const word of queryWords) {
    if (
      word.length < 3
    ) {
      continue;
    }

    if (
      textLower.includes(word)
    ) {
      score += 0.12;
    }
  }

  return score;
}

function typeBoost(
  type: string
) {
  switch (type) {
    case "experience":
      return 0.6;

    case "achievement":
      return 0.25;

    case "project":
      return 0.2;

    default:
      return 0;
  }
}

function businessImpactBoost(
  metadata: any
) {
  if (
    metadata.businessImpact
      ?.length
  ) {
    return 0.15;
  }

  return 0;
}

function recruiterIntentBoost(
  query: string,
  metadata: any
) {
  const lower =
    query.toLowerCase();

  let boost = 0;

  // Enterprise questions
  if (
    lower.includes(
      "experience"
    ) ||
    lower.includes(
      "professional"
    ) ||
    lower.includes(
      "worked"
    )
  ) {
    if (
      metadata.company
    ) {
      boost += 0.35;
    }
  }

  // Startup questions
  if (
    lower.includes(
      "startup"
    )
  ) {
    if (
      metadata.strengthSignals?.includes(
        "ownership"
      )
    ) {
      boost += 0.25;
    }
  }

  // AI questions
  if (
    lower.includes("ai")
  ) {
    if (
      metadata.capabilities?.some(
        (c: string) =>
          c
            .toLowerCase()
            .includes("ai")
      )
    ) {
      boost += 0.25;
    }
  }

  return boost;
}

export async function retrieveRelevantKnowledge(
  query: string,
  topK: number = 6
) {
  const knowledgePath =
    path.join(
      process.cwd(),
      "src/data/embeddings/knowledge.json"
    );

  const rawKnowledge =
    fs.readFileSync(
      knowledgePath,
      "utf-8"
    );

  const knowledge: KnowledgeItem[] =
    JSON.parse(rawKnowledge);

  const queryEmbedding =
    (await generateEmbedding(
      query
    )) as number[];

  const scoredResults =
    knowledge.map((item) => {
      const semanticScore =
        cosineSimilarity(
          queryEmbedding,
          item.embedding
        );

      const searchableText = `
        ${item.metadata.title || ""}
        ${item.metadata.summary || ""}
        ${item.metadata.company || ""}
        ${item.metadata.role || ""}
        ${(item.metadata.capabilities || []).join(
          " "
        )}
        ${(item.metadata.technologies || []).join(
          " "
        )}
        ${(item.metadata.domains || []).join(
          " "
        )}
        ${(item.metadata.businessImpact || []).join(
          " "
        )}
      `;

      const keywordBoost =
        keywordScore(
          query,
          searchableText
        );

      const importanceBoost =
        typeBoost(
          item.type
        );

      const impactBoost =
        businessImpactBoost(
          item.metadata
        );

      const intentBoost =
        recruiterIntentBoost(
          query,
          item.metadata
        );

      const finalScore =
        semanticScore * 0.65 +
        keywordBoost +
        importanceBoost +
        impactBoost +
        intentBoost;

      return {
        score: finalScore,
        semanticScore,
        keywordBoost,
        importanceBoost,
        impactBoost,
        intentBoost,
        metadata:
          item.metadata,
        type: item.type,
      };
    });

  const ranked =
    scoredResults.sort(
      (a, b) =>
        b.score - a.score
    );

  const rankedResults = ranked.slice(
    0,
    topK
  );

  const isAiQuestion =
    /\b(ai|artificial intelligence)\b/i.test(
      query
    );

  const topResults = isAiQuestion
    ? rankedResults.filter((item) =>
        item.metadata.title
          ?.toLowerCase()
          .includes("ai")
      )
    : rankedResults;

  const resultsToFilter =
    topResults.length > 0
      ? topResults
      : rankedResults;

  const strongestSemanticScore =
    resultsToFilter[0]?.semanticScore || 0;

  const relevantResults = resultsToFilter
    .filter((item) =>
      item.keywordBoost > 0 ||
      item.semanticScore >=
        Math.max(
          0.16,
          strongestSemanticScore * 0.65
        )
    )
    .filter((item, index, results) =>
      results.findIndex(
        (candidate) =>
          candidate.metadata.title ===
          item.metadata.title
      ) === index
    )
    .slice(0, 3);

  return relevantResults;
}