export function calculateFitScore(
  matches: Record<string, string[]>
) {
  const categories =
    Object.keys(matches);

  let totalMatched = 0;

  let totalPossible = 0;

  for (const category of categories) {
    totalMatched +=
      matches[category].length;

    totalPossible += 8;
  }

  const score = Math.min(
    95,
    Math.round(
      (totalMatched /
        totalPossible) *
        100
    )
  );

  return score;
}

type ScoreResult = {
  startup: number;
  faang: number;
  fullstack: number;
  ai: number;
  communication: number;
};

export function calculateScores(
  text: string
): ScoreResult {
  const lower =
    text.toLowerCase();

  let startup = 6;
  let faang = 6;
  let fullstack = 6;
  let ai = 6;
  let communication = 6;

  // -----------------------------
  // Startup Signals
  // -----------------------------

  if (
    lower.includes(
      "automation"
    )
  )
    startup += 1;

  if (
    lower.includes(
      "ownership"
    )
  )
    startup += 1;

  if (
    lower.includes(
      "chrome extension"
    )
  )
    startup += 1;

  // -----------------------------
  // Fullstack Signals
  // -----------------------------

  if (
    lower.includes(
      "angular"
    )
  )
    fullstack += 1;

  if (
    lower.includes(
      ".net"
    )
  )
    fullstack += 1;

  if (
    lower.includes(
      "api"
    )
  )
    fullstack += 1;

  // -----------------------------
  // AI Signals
  // -----------------------------

  if (
    lower.includes("ai")
  )
    ai += 2;

  if (
    lower.includes(
      "productivity"
    )
  )
    ai += 1;

  // -----------------------------
  // Communication Signals
  // -----------------------------

  if (
    lower.includes(
      "documentation"
    )
  )
    communication += 2;

  if (
    lower.includes(
      "knowledge"
    )
  )
    communication += 1;

  // -----------------------------
  // FAANG Signals
  // -----------------------------

  if (
    lower.includes(
      "scalable"
    )
  )
    faang += 1;

  if (
    lower.includes(
      "architecture"
    )
  )
    faang += 1;

  return {
    startup:
      Math.min(startup, 10),

    faang:
      Math.min(faang, 10),

    fullstack:
      Math.min(fullstack, 10),

    ai: Math.min(ai, 10),

    communication:
      Math.min(
        communication,
        10
      ),
  };
}