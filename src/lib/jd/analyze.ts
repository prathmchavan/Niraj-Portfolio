import capabilities from "@/data/raw/capabilities.json";

export function analyzeJobDescription(
  jd: string
) {
  const normalizedJD =
    jd.toLowerCase();

  const matches: Record<
    string,
    string[]
  > = {};

  for (const [category, skills] of Object.entries(
    capabilities
  )) {
    const matchedSkills =
      skills.filter((skill) =>
        normalizedJD.includes(
          skill.toLowerCase()
        )
      );

    matches[category] =
      matchedSkills;
  }

  return matches;
}