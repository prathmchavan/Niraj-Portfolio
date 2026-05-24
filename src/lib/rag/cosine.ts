import cosineSimilarity from "cosine-similarity";

export function calculateSimilarity(
  embeddingA: number[],
  embeddingB: number[]
) {
  return cosineSimilarity(embeddingA, embeddingB);
}