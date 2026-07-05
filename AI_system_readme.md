# AI Candidate Assistant System Documentation

## Overview

The AI Candidate Assistant is a sophisticated recruiter-facing chatbot built into Niraj's portfolio. It leverages **Retrieval-Augmented Generation (RAG)**, **intent detection**, and **job description analysis** to provide conversational candidate evaluation with evidence-backed responses.

**Route:** `http://localhost:3000/ai-candidate-assistant`

---

## Architecture

### System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER (RECRUITER)                             │
│              Asks questions via chat interface                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  API Route: /api/recruiter-chat│
        │    POST Request Handler        │
        └────────────┬───────────────────┘
                     │
     ┌───────────────┴───────────────────┐
     │                                   │
     ▼                                   ▼
┌──────────────────┐        ┌──────────────────────────┐
│ Intent Detection │        │  Session Management      │
│ (5 categories)  │        │ (UUID-based, max 10 msgs)│
└──────────────────┘        └──────────────────────────┘
     │
     │ intent: "experience" ──────────────────┐
     │ intent: "job-description" ────────────┐│
     │ intent: "fit" ────────────────────────┐││
     │ intent: "skills" ──────────────────────┐│││
     │ intent: "general" ──────────────────────┐││││
     │                                         │││││
     ▼                                         │││││
┌──────────────────────────────────────────┐  │││││
│ DETERMINISTIC HANDLERS                   │  │││││
│ - Experience Matrix Lookup               │  │││││
│ - Job Description Analysis               │  │││││
│ - JD Scoring (skill matching)            │  │││││
└──────────────────────────────────────────┘  │││││
     │ If intent matches deterministic ◄─────┘│││││
     │ response needed, return directly        │││││
     │                                         │││││
     ▼ (If general question)                   │││││
┌──────────────────────────────────────────┐  │││││
│ RAG RETRIEVAL PIPELINE                   │  │││││
│ 1. Query → Text Match Scoring (BM25-like)   │││││
│ 2. Score all 100+ knowledge items        │  │││││
│ 3. Rank & select Top-K (default: 4)      │  │││││
│ 4. Calculate confidence (40-95%)         │  │││││
└────────────┬─────────────────────────────┘  │││││
             │                                 │││││
             ▼                                 │││││
┌──────────────────────────────────────────┐  │││││
│ AI RESPONSE GENERATION                   │  │││││
│ - Build prompt with evidence context      │  │││││
│ - Stream response via AI provider         │  │││││
│ - (Ollama llama3 or HuggingFace)          │  │││││
└────────────┬─────────────────────────────┘  │││││
             │                                 │││││
             ▼                                 │││││
┌──────────────────────────────────────────┐  │││││
│ JSON-NDJSON STREAM TO CLIENT             │  │││││
│ {                                        │  │││││
│   "response": "partial response text",   │  │││││
│   "confidence": 85,                      │  │││││
│   "evidence": [{...}],                   │  │││││
│   "score": 78 (for JD matches)           │  │││││
│ }                                        │  │││││
└────────────┬─────────────────────────────┘  │││││
             │                                 │││││
             ▼                                 │││││
┌──────────────────────────────────────────┐  │││││
│ FRONTEND: React Client                   │  │││││
│ - Renders message bubbles                │  │││││
│ - Displays evidence cards                │  │││││
│ - Streams text with typing animation     │  │││││
└──────────────────────────────────────────┘  │││││
```

---

## Core Components

### 1. **Intent Detection** (`src/lib/recruiter/intelligence.ts`)

Categorizes recruiter questions into 5 intent types:

| Intent | Keywords | Handler |
|--------|----------|---------|
| `experience` | "years", "experience with", "how long" | Experience Matrix Lookup |
| `job-description` | "job description", "requirements", length > 400 chars | JD Analysis + Scoring |
| `fit` | "fit", "startup", "faang" | Skill fit calculation |
| `skills` | "skills", "technology", "stack" | Capability matching |
| `general` | Everything else | RAG Retrieval |

### 2. **RAG Retrieval** (`src/lib/rag/retrieve.ts`)

**Algorithm:** BM25-like text matching (keyword frequency scoring)

**Data Source:** `src/data/embeddings/knowledge.json` (100+ items)

**Process:**
1. Load knowledge base from JSON file
2. Score each item against query using keyword matching
3. Weight each word occurrence by 3 points
4. Rank by cumulative score
5. Return top-K results (default: 4)

**Knowledge Structure:**
```json
{
  "metadata": {
    "title": "string",
    "summary": "string",
    "capabilities": ["string"],
    "domains": ["string"],
    "businessImpact": ["string"],
    "technicalChallenges": ["string"],
    "roleAlignment": { "key": "score" },
    "technologies": ["string"],
    "embeddingText": "string"
  }
}
```

### 3. **Confidence Calculation** (`src/lib/recruiter/confidence.ts`)

- **No evidence:** 40%
- **With evidence:** Average match score × 1.2, capped at 95%

### 4. **AI Response Generation** (`src/lib/ai/generate.ts`)

**System Prompt:** Forces factual, evidence-only responses

**Key Rules:**
- Only use provided evidence
- Never hallucinate companies, roles, or achievements
- Acknowledge missing information professionally
- Maximum 3 paragraphs, recruiter-friendly tone
- No marketing language

**Streaming:** Response streams back as JSON-NDJSON (one JSON object per line)

### 5. **AI Providers** (`src/lib/ai/providers/`)

**Currently Implemented:**
- **Ollama** (Local, free): `llama3` model via `http://localhost:11434/api/chat`
  - Temperature: 0.3 (deterministic)
  - Model: llama3
  
**Partially Implemented:**
- **HuggingFace** (Stub – throws "not implemented" error)

**Configuration via env var:** `AI_PROVIDER`

---

## Data Layer

### Raw Data Files (`src/data/raw/`)

| File | Purpose |
|------|---------|
| `experience-matrix.json` | Technology experience: years, areas, confidence |
| `capabilities.json` | Skill categories (frontend, backend, ai, startup, etc.) |
| `projects.json` | Project descriptions & achievements |
| `resume-base.json` | Base resume data |
| `strengths.json` | Key strength areas |
| `{company}-experience.json` | Company-specific experience (IAASTHA, Networcx, Onit) |
| `professional-recognition.json` | Awards, recognition, metrics |

### Embedded Knowledge (`src/data/embeddings/knowledge.json`)

Aggregated & enriched knowledge with metadata for RAG retrieval. Generated via `npm run generate:embeddings`.

---

## Session Management (`src/lib/session/store.ts`)

- **Storage:** In-memory Map (session lost on server restart)
- **Session ID:** UUID per user (sent from frontend)
- **Message Limit:** Last 10 messages per session
- **Data:** Array of `{ role, content }` pairs (assistant/user)

**Limitation:** Sessions don't persist across server restarts.

---

## API Endpoint

### `POST /api/recruiter-chat`

**Request:**
```json
{
  "message": "string (recruiter question or JD)",
  "sessionId": "uuid"
}
```

**Response Stream (JSON-NDJSON):**
```json
{
  "response": "partial response text",
  "confidence": 85,
  "evidence": [{ "metadata": {...} }],
  "score": 78
}
{
  "response": "more response text",
  "confidence": 85,
  "evidence": [...],
  "score": 78
}
```

**Error Response:**
```json
{
  "error": "Recruiter assistant failed"
}
```

---

## Frontend Integration (`src/app/ai-candidate-assistant/page.tsx`)

### Features

1. **Chat Interface**
   - User textarea with auto-resize
   - Send button (disabled during response)
   - Message bubbles (user right, assistant left)

2. **Streaming Display**
   - Typing indicator with loading messages
   - Text streams in real-time as JSON arrives
   - Evidence cards displayed below chat

3. **Suggested Questions**
   - 6 pre-populated recruiter questions
   - Click to populate input & send

4. **Evidence Section**
   - Grid layout of evidence cards
   - Metadata: title, summary, capabilities, impact

5. **Loading States**
   - Loading messages rotate every 1.8s:
     - "Analyzing recruiter intent..."
     - "Reviewing technical experience..."
     - "Evaluating startup alignment..."
     - "Matching skills with evidence..."
     - "Building confidence analysis..."
     - "Generating recruiter summary..."

---

## Configuration & Environment

### Environment Variables

```bash
AI_PROVIDER=ollama          # or "huggingface"
```

### Ollama Setup (Local)

```bash
# Install Ollama from https://ollama.ai
ollama pull llama3
ollama serve  # Runs on http://localhost:11434
```

### Scripts

```bash
npm run dev                     # Start dev server (Next.js on :3000)
npm run build                   # Production build
npm run start                   # Production start
npm run generate:embeddings    # Refresh knowledge.json from raw data
npm run test:retrieval         # Test RAG retrieval
npm run test:ai                # Test AI response generation
```

---

## Limitations & Known Issues

### 1. **No Persistent Sessions**
- Sessions stored in-memory; lost on server restart
- **Fix:** Implement database (Redis/PostgreSQL) session store

### 2. **Limited RAG Quality**
- Uses simple BM25-like keyword matching, not semantic embeddings
- No real vector embeddings despite `@xenova/transformers` installed
- **Fix:** Implement actual embedding pipeline + cosine similarity search

### 3. **HuggingFace Provider Not Implemented**
- Throws error if `AI_PROVIDER=huggingface`
- **Fix:** Implement HuggingFace inference API client

### 4. **Ollama Dependency**
- Requires local Ollama server running at `http://localhost:11434`
- If Ollama is down, API returns 500 error with no fallback
- **Fix:** Add error handling + fallback provider (e.g., Groq API already in dependencies)

### 5. **Hallucination Still Possible**
- System prompt enforces evidence-only responses, but LLM may still hallucinate
- No citation mechanism to prove which evidence was used
- **Fix:** Add explicit citation in response: "Evidence 2 shows..."

### 6. **No JD Parsing**
- JD analysis uses keyword matching, not true parsing
- Misses nuances (e.g., "3+ years" vs. "junior")
- **Fix:** Implement NLP-based job description parser (spaCy, etc.)

### 7. **Knowledge Base Outdated**
- Knowledge base is static JSON; doesn't auto-update with new projects/experience
- `generate:embeddings` script must be run manually
- **Fix:** Implement CI/CD pipeline to auto-regenerate on changes

### 8. **No Rate Limiting**
- API endpoint has no rate limits
- Vulnerable to spam/DDoS
- **Fix:** Add rate limiting middleware

### 9. **Large Context Window Requires Frequent Scrolling**
- Frontend streams long responses; user must scroll to see evidence
- **Fix:** Add sticky evidence sidebar or collapsible sections

### 10. **Model Capacity**
- `llama3` (7B params) may struggle with complex role/startup fit analysis
- **Fix:** Use larger model (llama2 13B) or commercial API (Groq, Claude, GPT-4)

---

## Testing

### Manual Testing

```bash
# Start Ollama
ollama serve

# In another terminal, start dev server
npm run dev

# Open http://localhost:3000/ai-candidate-assistant
# Try: "How many years of experience with React?"
# Try: "Would Niraj be a fit for a startup?"
# Try: [Paste a JD]
```

### Test Scripts

```bash
npm run test:ai          # Tests AI response generation
npm run test:retrieval   # Tests RAG retrieval
```

---

## Future Enhancements

1. **Semantic Search** - Replace BM25 with real embeddings + cosine similarity
2. **Persistent Sessions** - Database-backed session store
3. **Multi-Provider Support** - Groq, OpenAI, Anthropic fallbacks
4. **Citation System** - Show which evidence supports each claim
5. **Advanced JD Parsing** - Extract requirements, salaries, roles
6. **Analytics Dashboard** - Track recruiter questions & response quality
7. **Fine-tuning** - Fine-tune LLM on Niraj's background for better fit analysis
8. **Web Search** - Augment knowledge base with current company/industry info
9. **Email Integration** - Send follow-up summaries to recruiters
10. **Feedback Loop** - Thumbs up/down to improve response quality

---

## Files Structure

```
src/
├── app/
│   ├── api/
│   │   └── recruiter-chat/
│   │       └── route.ts          # Main API endpoint
│   ├── ai-candidate-assistant/
│   │   └── page.tsx              # Frontend chat UI
│   └── globals.css               # Chat styles
├── components/
│   └── ai/
│       ├── ChatInput.tsx
│       ├── ChatWindow.tsx
│       ├── EvidenceCard.tsx
│       ├── MessageBubble.tsx
│       ├── SuggestedQuestions.tsx
│       └── TypingIndicator.tsx
├── lib/
│   ├── ai/
│   │   ├── generate.ts           # Response generation
│   │   ├── types.ts
│   │   └── providers/
│   │       ├── index.ts
│   │       ├── ollama.ts         # Ollama integration
│   │       └── huggingface.ts    # (Not implemented)
│   ├── rag/
│   │   ├── retrieve.ts           # BM25 retrieval
│   │   ├── embed.ts              # Embedding generation
│   │   ├── rank.ts
│   │   └── cosine.ts
│   ├── recruiter/
│   │   ├── intelligence.ts       # Intent detection, JD analysis
│   │   └── confidence.ts         # Confidence scoring
│   ├── jd/
│   │   ├── analyzeJobDescription.ts
│   │   ├── calculateFit.ts
│   │   ├── generateJDReport.ts
│   │   ├── generateMatchSummary.ts
│   │   └── score.ts
│   ├── session/
│   │   └── store.ts              # In-memory session management
│   └── prompts/
│       ├── recruiter.ts
│       └── fit-analysis.ts
├── data/
│   ├── raw/
│   │   ├── experience-matrix.json
│   │   ├── capabilities.json
│   │   ├── projects.json
│   │   └── ...
│   └── embeddings/
│       └── knowledge.json        # RAG knowledge base
└── types/
    └── chat.ts                   # TypeScript types

scripts/
├── generate-embeddings.ts
├── test-retrieval.ts
└── test-ai.ts
```

---

## Contact & Debugging

- **Dev Server:** `npm run dev` → `http://localhost:3000`
- **AI Page:** `http://localhost:3000/ai-candidate-assistant`
- **Ollama:** `http://localhost:11434`
- **Check logs:** Browser console (frontend), terminal (backend)
- **Env vars:** Check `.env.local` or shell environment

---

**Last Updated:** May 24, 2026

NEXT -
1. Add Rate limit to allow only set of questions can be asked per session.
2. Record the asked qestions and save them.
3. Get the info of user how is asking the questions.
4. Remove Supporting Evidence and add the URL.
5. Add redirect code.
6. Make the Textarea smaller

Senior Solutions Engineer | Enterprise SaaS | Workflow Automation | AI Solutions Builder