type SessionData = {
  messages: {
    role: string;
    content: string;
  }[];

  lastJobDescription?: string;
};

const recruiterSessions =
  new Map<string, SessionData>();

export function getSession(
  sessionId: string
) {
  if (
    !recruiterSessions.has(
      sessionId
    )
  ) {
    recruiterSessions.set(
      sessionId,
      {
        messages: [],
      }
    );
  }

  return recruiterSessions.get(
    sessionId
  )!;
}

export function updateSession(
  sessionId: string,
  message: {
    role: string;
    content: string;
  }
) {
  const session =
    getSession(sessionId);

  session.messages.push(message);

  if (
    session.messages.length > 10
  ) {
    session.messages.shift();
  }
}