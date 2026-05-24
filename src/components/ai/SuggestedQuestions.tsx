type Props = {
  onSelect: (question: string) => void;
};

const questions = [
  "How Many Years of Experience Does Niraj Have with .Net and C#?",
  "Would Niraj be a strong fit for a startup engineering team?",
  "How does this candidate demonstrate problem solving ability?",
];

const que = [
  "Would Niraj be a strong fit for a startup engineering team?",
  "How does this candidate demonstrate problem solving ability?",
  "What projects best demonstrate fullstack engineering experience?",
  "Would this candidate perform well in fast-paced environments?",
  "Analyze fit for a solutions engineering role.",
  "What evidence suggests strong ownership and execution?",
];

export default function SuggestedQuestions({
  onSelect,
}: Props) {
  return (
    <div className="suggested-section">
      <p>Suggested recruiter questions</p>

      <div className="suggested-grid">
        {questions.map((question) => (
          <button
            key={question}
            className="suggested-card"
            onClick={() =>
              onSelect(question)
            }
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}