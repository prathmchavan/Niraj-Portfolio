export function generateJDReport(
  score: number,
  recommendation: string,
  categories: {
    category: string;
    matchedSkills: string[];
  }[]
) {
  const strengths =
    categories.map(
      (c) => `• ${c.category}`
    );

  return `
Overall Match Score: ${score}%

Recommendation: ${recommendation}

Strong Areas:
${strengths.join("\n")}

This candidate aligns well with the technical and engineering expectations reflected in the job description.
  `;
}