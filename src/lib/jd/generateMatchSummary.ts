export function generateMatchSummary(
  score: number,
  matches: Record<string, string[]>
) {
  const strengths = Object.entries(
    matches
  )
    .filter(
      ([_, skills]) =>
        skills.length > 0
    )
    .map(([category]) => category);

  return {
    score,

    strengths,

    recommendation:
      score >= 75
        ? "Strong Fit"
        : score >= 55
        ? "Moderate Fit"
        : "Potential Fit",
  };
}