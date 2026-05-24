export function calculateFit(
  matchedCategories: {
    category: string;
    matchedSkills: string[];
  }[]
) {
  const totalMatches =
    matchedCategories.reduce(
      (acc, item) =>
        acc + item.matchedSkills.length,
      0
    );

  let score =
    45 + totalMatches * 8;

  score = Math.min(score, 95);

  let recommendation =
    "Potential Fit";

  if (score >= 80) {
    recommendation =
      "Strong Fit";
  } else if (score >= 65) {
    recommendation =
      "Good Fit";
  }

  return {
    score,
    recommendation,
  };
}