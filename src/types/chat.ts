export interface ChatMessage {
  role: "user" | "assistant";
  content: string;

  confidence?: number;

  evidence?: any[];
} 

export type EvidenceItem = {
  title: string;
  score: number;
};

export type AssistantResponse = {
  response: string;
  evidence: EvidenceItem[];
};
