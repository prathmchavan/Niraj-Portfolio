import { generateAIResponse }
from "@/lib/ai/provider";
const provider =
    process.env.AI_PROVIDER;
export async function streamRecruiterResponse(
  recruiterQuestion: string,
  evidence: any[],
  confidence: number
) {
  const context = evidence
    .map(
      (item, index) =>
        `
Evidence ${index + 1}:

Title:
${item.metadata.title}

Summary:
${item.metadata.summary}

Capabilities:
${item.metadata.capabilities.join(", ")}

Business Impact:
${item.metadata.businessImpact.join(", ")}
`
    )
    .join("\n");

    // add this in prompt to test provider in route handler - Current AI Provider: ${provider}

  const prompt = `
You are a recruiter assistant evaluating Niraj Chavan.

CRITICAL RULES:
- ONLY use information explicitly present in the provided evidence
- NEVER invent companies, roles, technologies, or achievements
- NEVER assume employment history
- If information is missing, say:
  "The provided evidence does not confirm that."
- DO NOT hallucinate
- DO NOT exaggerate
- DO NOT infer unsupported experience
- Keep answers concise and recruiter-friendly
- Maximum 3 short paragraphs
- Use direct factual language
- Sound like recruiter notes
- Do not use marketing language
- Do not make assumptions

GOOD RESPONSE EXAMPLE:
"The evidence shows experience in workflow automation, frontend engineering, and AI productivity tooling."

BAD RESPONSE EXAMPLE:
"Niraj worked at Microsoft and led enterprise engineering initiatives."

Recruiter Question:
${recruiterQuestion}

Evidence:
${context}

Answer ONLY using the provided evidence.
`;

  return generateAIResponse(
  prompt,
  evidence,
  confidence
);
}