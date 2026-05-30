import fs from "fs";
import path from "path";

import { generateEmbedding } from "../src/lib/rag/embed";

async function loadJson(file: string) {
  const filePath = path.join(
    process.cwd(),
    file
  );

  return JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );
}

function normalizeItem(item: any) {
  // RAW STRUCTURE
  if (item.embeddingText) {
    return {
      id: item.id,
      type: item.type || "general",
      metadata: item,
      embeddingText:
        item.embeddingText,
    };
  }

  // METADATA STRUCTURE
  if (item.metadata) {
    return {
      id: item.id,
      type:
        item.type ||
        item.metadata.type ||
        "general",
      metadata: item.metadata,
      embeddingText:
        item.metadata.embeddingText,
    };
  }

  return null;
}

async function main() {
  const projects = await loadJson(
    "src/data/raw/projects.json"
  );

  const achievements =
    await loadJson(
      "src/data/raw/achievements.json"
    );

  const experience =
    await loadJson(
      "src/data/raw/experience.json"
    );

  const timeline =
    await loadJson(
      "src/data/recruiter/career-timeline.json"
    );

  const combined = [
    ...projects,
    ...achievements,
    ...experience,
    ...timeline,
  ];

  const validCombined =
  combined.filter(
    (item) =>
      item &&
      (
        item.title ||
        item.metadata?.title
      )
  );

  const embeddedKnowledge = [];

  for (const item of validCombined) {
  const normalized = item.metadata
    ? {
        ...item.metadata,
        id: item.id,
        type: item.type,
      }
    : item;

  console.log(
  "RAW ITEM:",
  JSON.stringify(item, null, 2)
);

console.log(
  `Embedding: ${normalized.title}`
);

  const richText = `
TITLE:
${normalized.title || ""}

SUMMARY:
${normalized.summary || ""}

TECHNOLOGIES:
${(
  normalized.technologies || []
).join(", ")}

CAPABILITIES:
${(
  normalized.capabilities || []
).join(", ")}

DOMAINS:
${(
  normalized.domains || []
).join(", ")}

BUSINESS IMPACT:
${(
  normalized.businessImpact || []
).join(", ")}

TECHNICAL CHALLENGES:
${(
  normalized.technicalChallenges || []
).join(", ")}

ROLE ALIGNMENT:
${JSON.stringify(
  normalized.roleAlignment || {}
)}

EMBEDDING CONTEXT:
${normalized.embeddingText || ""}
`;

  const embedding =
    await generateEmbedding(
      richText
    );

  embeddedKnowledge.push({
    id: normalized.id,
    type: normalized.type,
    embedding,
    metadata: normalized,
  });
}

  const outputPath = path.join(
    process.cwd(),
    "src/data/embeddings/knowledge.json"
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      embeddedKnowledge,
      null,
      2
    )
  );

  console.log(
    "Embeddings generated successfully."
  );
}

main();