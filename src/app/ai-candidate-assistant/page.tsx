"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import MessageBubble from "@/components/ai/MessageBubble";
import EvidenceCard from "@/components/ai/EvidenceCard";
import SuggestedQuestions from "@/components/ai/SuggestedQuestions";
import TypingIndicator from "@/components/ai/TypingIndicator";

import { ChatMessage } from "@/types/chat";

const loadingMessages = [
  "Analyzing recruiter intent...",
  "Reviewing technical experience...",
  "Evaluating startup alignment...",
  "Matching skills with evidence...",
  "Building confidence analysis...",
  "Generating recruiter summary...",
];

export default function AICandidateAssistantPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(crypto.randomUUID());
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [ hasStartedResponse, setHasStartedResponse] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello — I’m Niraj’s AI Candidate Assistant. You can ask about technical skills, startup fit, fullstack engineering experience, AI productivity mindset, or paste a job description for analysis.",
    },
  ]);
  const [evidence, setEvidence] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showTopButton, setShowTopButton] = useState(false);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Resize textarea to fit content but cap at 100px
  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (!ta) return;

    ta.style.height = "auto";
    const newHeight = Math.min(ta.scrollHeight, 100);
    ta.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    // Whenever message changes (including programmatic changes), adjust height
    resizeTextarea();
  }, [message]);

  // Show a back-to-top button when scrolled more than 1000px
  useEffect(() => {
    const onScroll = () => {
      setShowTopButton(window.scrollY > 1000);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // initialize
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSend() {
  if (!message.trim()) return;

  const currentMessage = message;

  const userMessage: ChatMessage = {
    role: "user",
    content: currentMessage,
  };

  setMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  setMessage("");

  setLoading(true);

  setHasStartedResponse(false);

  let responseStarted = false;

  let currentIndex = 0;

  const interval = setInterval(() => {
    if (responseStarted) return;

    currentIndex =
      (currentIndex + 1) %
      loadingMessages.length;

    setLoadingMessage(
      loadingMessages[currentIndex]
    );
  }, 1800);

  try {
    const response = await fetch(
      "/api/recruiter-chat",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          sessionId,
        }),
      }
    );

    if (!response.body) {
      clearInterval(interval);
      setLoading(false);
      return;
    }

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder();

    let assistantText = "";

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "",
      },
    ]);

    while (true) {
      const { done, value } =
        await reader.read();

      if (done) break;

      const chunk =
        decoder.decode(value);

      const lines = chunk
        .split("\n")
        .filter(Boolean);

      for (const line of lines) {
        try {
          const parsed =
            JSON.parse(line);

          if (parsed.response) {
            console.log(
    "JD Match Score:",
    parsed.score
  );
            // IMPORTANT FIX
            if (!responseStarted) {
              responseStarted = true;

              clearInterval(interval);

              setHasStartedResponse(
                true
              );
            }

            assistantText +=
              parsed.response;

            setMessages((prev) => {
              const updated = [
                ...prev,
              ];

              updated[
                updated.length - 1
              ] = {
                role: "assistant",
                content:
                  assistantText,
                confidence:
                  parsed.confidence,
                evidence:
                  parsed.evidence ||
                  [],
              };

              return updated;
            });

            if (
              parsed.evidence
            ) {
              setEvidence(
                parsed.evidence
              );
            }
          }
        } catch (error) {
          console.error(
            "Stream parse error:",
            error
          );
        }
      }
    }

    clearInterval(interval);

    setLoading(false);

    setHasStartedResponse(false);
  } catch (error) {
    console.error(error);

    clearInterval(interval);

    setLoading(false);

    setHasStartedResponse(false);
  }
}

  return (
    <main className="ai-page">
      <div className="ai-container">
        <div className="ai-header">
          <Link href="/">
            <button className="ai-back-button">←See Portfolio</button>
          </Link>
          <p className="ai-label">Candidate Assistant</p>
          <h1>Talk to an AI version of Niraj</h1>
          <p className="ai-subtitle">
            Recruiters can evaluate technical fit, startup readiness, engineering mindset, and project experience conversationally.
          </p>
          
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}

          {loading && !hasStartedResponse && (
            <TypingIndicator message={loadingMessage} />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* {evidence.length > 0 && (
          <div className="evidence-section">
            <h3>Supporting Evidence</h3>
            <div className="evidence-grid">
              {evidence.map((item, index) => (
                <EvidenceCard key={index} evidence={item} />
              ))}
            </div>
          </div>
        )} */}

        {!loading && (
          <SuggestedQuestions onSelect={(question) => setMessage(question)} />
        )}

        <div className="ai-chat-box">
          <textarea
            ref={textareaRef}
            onInput={resizeTextarea}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                handleSend();
              }
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask recruiter-style questions or paste a job description..."
          />
          <button onClick={handleSend} disabled={loading}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
        <button
          className={`back-to-top ${showTopButton ? "visible" : ""}`}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          aria-label="Scroll to top"
          title="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 5L12 19" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12L12 5L19 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </main>
  );
}