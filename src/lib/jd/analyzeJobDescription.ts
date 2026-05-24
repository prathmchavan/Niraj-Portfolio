import capabilities from "@/data/raw/capabilities.json";

export function analyzeJobDescription(
  jd: string
) {
  const normalized =
    jd.toLowerCase();

  const matchedCategories: {
    category: string;
    matchedSkills: string[];
  }[] = [];

  for (const [category, skills] of Object.entries(
    capabilities
  )) {
    const matches =
      skills.filter((skill) =>
        normalized.includes(
          skill.toLowerCase()
        )
      );

    if (matches.length > 0) {
      matchedCategories.push({
        category,
        matchedSkills: matches,
      });
    }
  }

  return matchedCategories;
}