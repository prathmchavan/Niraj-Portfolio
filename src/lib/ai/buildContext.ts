export function buildRecruiterContext(
  evidence: any[]
) {
  const sorted =
    [...evidence].sort(
      (a, b) => {
        const priority = {
          experience: 3,
          achievement: 2,
          project: 1,
        };

        return (
          (priority[
            b.type as keyof typeof priority
          ] || 0) -
          (priority[
            a.type as keyof typeof priority
          ] || 0)
        );
      }
    );

  return sorted
    .map((item) => {
      return `
TYPE:
${item.type}

TITLE:
${item.metadata.title}

SUMMARY:
${item.metadata.summary}

TECHNOLOGIES:
${(
  item.metadata
    .technologies || []
).join(", ")}

CAPABILITIES:
${(
  item.metadata
    .capabilities || []
).join(", ")}

Business Impact:
${(
  item.metadata.businessImpact || []
).join(", ")}

Links:
${JSON.stringify(item.metadata.links || {})}

TECHNICAL CHALLENGES:
${(
  item.metadata
    .technicalChallenges || []
).join(", ")}

DOMAINS:
${(
  item.metadata
    .domains || []
).join(", ")}
`;
    })
    .join("\n------------------\n");
}