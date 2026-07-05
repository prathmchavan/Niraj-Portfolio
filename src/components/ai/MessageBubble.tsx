import { ChatMessage } from "@/types/chat";

type Props = {
  message: ChatMessage;
};

export default function MessageBubble({
  message,
}: Props) {
  const isAssistant =
    message.role === "assistant";

  const linkify = (text: string) => {
    if (!text) return null;

    const urlRegex = /https?:\/\/[^\s)"']+/g;
    const parts: Array<string | JSX.Element> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = urlRegex.exec(text))) {
      const url = match[0];
      const idx = match.index;

      if (idx > lastIndex) {
        parts.push(text.slice(lastIndex, idx));
      }

      parts.push(
        <a
          key={`link-${idx}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="evidence-link"
        >
          {url}
        </a>
      );

      lastIndex = idx + url.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // Replace newlines with <br /> while preserving links
    return parts.map((p, i) => {
      if (typeof p === "string") {
        const segments = p.split("\n");
        return segments.flatMap((seg, si) =>
          si < segments.length - 1
            ? [seg, <br key={`br-${i}-${si}`} />]
            : [seg]
        );
      }

      return p;
    });
  };

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
          {linkify(message.content ?? "")}
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