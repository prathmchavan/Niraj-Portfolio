type Props = {
  message: string;
};

export default function TypingIndicator({
  message,
}: Props) {
  return (
    <div className="typing-indicator">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p>{message}</p>
    </div>
  );
}