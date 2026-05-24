type Props = {
  evidence: any;
};

export default function EvidenceCard({
  evidence,
}: Props) {
  const metadata =
    evidence.metadata || {};

  const confidence =
    evidence.score
      ? Math.min(
  Math.round(
    (evidence.score / 10) *
      100
  ),
  98
)
      : metadata.confidence || 0;

  return (
    <div className="evidence-card">
      <div className="evidence-header">
        <h4>
          {metadata.title ||
            evidence.title ||
            "Untitled Evidence"}
        </h4>

        <div className="confidence-badge">
          {confidence}% Match
        </div>
      </div>

      <p className="evidence-summary">
        {metadata.summary ||
          "No summary available."}
      </p>

      {metadata.capabilities &&
        metadata.capabilities
          .length > 0 && (
          <div className="evidence-tags">
            {metadata.capabilities.map(
              (
                capability: string,
                index: number
              ) => (
                <span
                  key={index}
                  className="evidence-tag"
                >
                  {capability}
                </span>
              )
            )}
          </div>
        )}

      {metadata.url && (
        <a
          href={metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className="evidence-link"
        >
          View Source →
        </a>
      )}
    </div>
  );
}