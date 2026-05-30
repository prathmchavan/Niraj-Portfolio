let extractor: any = null;

export async function generateEmbedding(
  text: string
) {
  if (!extractor) {
    const { pipeline } = await import(
      "@xenova/transformers"
    );

    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(
    output.data
  ) as number[];
}