import { ChatMessage } from "@/types/chat";

type Props = {
  message: ChatMessage;
};

export default function MessageBubble({
  message,
}: Props) {
  const isAssistant =
    message.role === "assistant";

  return (
    <div
      className={`message-row ${
        isAssistant
          ? "assistant"
          : "user"
      }`}
    >
      <div className="message-bubble">

        {isAssistant &&
          message.confidence && (
            <div className="confidence-badge">
              {
                message.confidence
              }
              % Match Confidence
            </div>
          )}

        <div className="message-content">
          {message.content}
        </div>

        {isAssistant &&
          message.evidence &&
          message.evidence.length >
            0 && (
            <div className="message-evidence">
              {message.evidence.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="mini-evidence-card"
                  >
                    <p className="evidence-title">
                      {
                        item
                          .metadata
                          ?.title
                      }
                    </p>

                    <p className="evidence-score">
                      Relevance: {Math.min(Math.round(item.score * 100), 100)}%
                    </p>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </div>
  );
}