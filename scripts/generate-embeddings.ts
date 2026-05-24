import fs from "fs";
import path from "path";

import { generateEmbedding } from "../src/lib/rag/embed";

async function main() {
  const projectsPath = path.join(
    process.cwd(),
    "src/data/raw/projects.json"
  );

  const rawProjects = fs.readFileSync(projectsPath, "utf-8");

  const projects = JSON.parse(rawProjects);

  const embeddedProjects = [];

  for (const project of projects) {
    console.log(`Embedding: ${project.title}`);

    const embedding = await generateEmbedding(
      project.embeddingText
    );

    embeddedProjects.push({
      id: project.id,
      type: project.type,
      title: project.title,
      embedding,
      metadata: project,
    });
  }

  const outputPath = path.join(
    process.cwd(),
    "src/data/embeddings/knowledge.json"
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(embeddedProjects, null, 2)
  );

  console.log("Embeddings generated successfully.");
}

main();