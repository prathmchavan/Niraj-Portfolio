export function calculateConfidence(
  evidence: any[]
) {
  if (!evidence.length) {
    return 40;
  }

  const avg =
    evidence.reduce(
      (acc, item) =>
        acc + item.score,
      0
    ) / evidence.length;

  const normalized =
    Math.min(
      95,
      Math.round(avg * 120)
    );

  return normalized;
}