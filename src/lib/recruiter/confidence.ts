export function calculateConfidence(
  evidence: any[]
) {
  if (!evidence.length) {
    return 45;
  }

  const avg =
    evidence.reduce(
      (acc, item) =>
        acc + item.score,
      0
    ) / evidence.length;

  const normalized =
    Math.min(
      98,
      Math.max(
        65,
        Math.round(avg * 100)
      )
    );

  return normalized;
}