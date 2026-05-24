import experienceMatrix from "@/data/raw/experience-matrix.json";
import { analyzeJobDescription } from "@/lib/jd/analyzeJobDescription";

import { calculateFit } from "@/lib/jd/calculateFit";

import { generateJDReport } from "@/lib/jd/generateJDReport";

export type RecruiterIntent =
  | "experience"
  | "job-description"
  | "fit"
  | "skills"
  | "general";

export function detectRecruiterIntent(
  message: string
): RecruiterIntent {
  const lower =
    message.toLowerCase();

  if (
    lower.includes("years") ||
    lower.includes("experience with") ||
    lower.includes("how long")
  ) {
    return "experience";
  }

  if (
    lower.includes("job description") ||
    lower.includes("requirements") ||
    lower.length > 400
  ) {
    return "job-description";
  }

  if (
    lower.includes("fit") ||
    lower.includes("startup") ||
    lower.includes("faang")
  ) {
    return "fit";
  }

  if (
    lower.includes("skills") ||
    lower.includes("technology") ||
    lower.includes("stack")
  ) {
    return "skills";
  }

  return "general";
}

export function resolveExperienceQuestion(
  message: string
) {
  const lower =
    message.toLowerCase();

  const technologies =
    experienceMatrix.technologies;

  const match =
    technologies.find((tech) =>
      lower.includes(
        tech.name.toLowerCase()
      )
    );

  if (!match) {
    return null;
  }

  return `
Niraj has approximately ${match.years} years of experience with ${match.name}, primarily focused on ${match.areas.join(
    ", "
  )}.
  `;
}

export function resolveJobDescription(
  jd: string
) {
  const categories =
    analyzeJobDescription(jd);

  const fit =
    calculateFit(categories);

  return generateJDReport(
    fit.score,
    fit.recommendation,
    categories
  );
}
export function calculateJDMatchScore(
  jobDescription: string
) {
  const normalized =
    jobDescription.toLowerCase();

  let score = 0;

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  const skillsMap = [
    {
      skill: "react",
      weight: 10,
    },
    {
      skill: "next.js",
      weight: 10,
    },
    {
      skill: "typescript",
      weight: 10,
    },
    {
      skill: "javascript",
      weight: 8,
    },
    {
      skill: "angular",
      weight: 8,
    },
    {
      skill: ".net",
      weight: 10,
    },
    {
      skill: "c#",
      weight: 10,
    },
    {
      skill: "ai",
      weight: 8,
    },
    {
      skill: "automation",
      weight: 8,
    },
    {
      skill: "startup",
      weight: 5,
    },
  ];

  for (const item of skillsMap) {
    if (
      normalized.includes(item.skill)
    ) {
      score += item.weight;

      matchedSkills.push(
        item.skill
      );
    } else {
      missingSkills.push(
        item.skill
      );
    }
  }

  if (score > 100) {
    score = 100;
  }

  return {
    score,
    matchedSkills,
    missingSkills:
      missingSkills.slice(0, 5),
  };
}