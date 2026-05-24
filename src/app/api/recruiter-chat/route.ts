import { NextRequest } from "next/server";

import { retrieveRelevantKnowledge } from "@/lib/rag/retrieve";

import { streamRecruiterResponse } from "@/lib/ai/generate";
import { calculateConfidence } from "@/lib/recruiter/confidence";
import {
  detectRecruiterIntent,
  resolveExperienceQuestion,
  resolveJobDescription,
  calculateJDMatchScore
} from "@/lib/recruiter/intelligence";

import {
  getSession,
  updateSession,
} from "@/lib/session/store";

export async function POST(
  req: NextRequest
) {
  try {console.log(
  "AI PROVIDER:",
  process.env.AI_PROVIDER
);

    const body = await req.json();

    const message = body.message;

    const sessionId =
      body.sessionId ||
      "default-session";

    const session =
      getSession(sessionId);

    updateSession(sessionId, {
      role: "user",
      content: message,
    });

    // -----------------------------
    // Detect recruiter intent
    // -----------------------------

    const intent =
      detectRecruiterIntent(message);

    // -----------------------------
    // Deterministic experience answers
    // -----------------------------

    if (intent === "experience") {
      const response =
        resolveExperienceQuestion(
          message
        );

      if (response) {
        return Response.json({
          response,
          evidence: [],
        });
      }
    }

    if (intent === "job-description") {

  const report =
    resolveJobDescription(
      message
    );

  const matchData =
    calculateJDMatchScore(
      message
    );

  return Response.json({
    response: report,

    score:
      matchData.score,

    matchedSkills:
      matchData.matchedSkills,

    missingSkills:
      matchData.missingSkills,

    evidence: [],
  });
}

    // -----------------------------
    // RAG Retrieval
    // -----------------------------

    const evidence =
      await retrieveRelevantKnowledge(
        message,
        4
      );

    const confidence =
      calculateConfidence(
        evidence
    );
    // -----------------------------
    // Stream AI Response
    // -----------------------------

    const stream =
      await streamRecruiterResponse(
        message,
        evidence,
        confidence
      );

    updateSession(sessionId, {
  role: "assistant",
  content:
    "AI recruiter response generated",
});

    return new Response(stream, {
      headers: {
        "Content-Type":
          "application/json",
        "Cache-Control":
          "no-cache",
        Connection: "keep-alive",
      },
    });
    
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Recruiter assistant failed",
      },
      {
        status: 500,
      }
    );
  }
}