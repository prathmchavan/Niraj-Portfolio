export function rankResults(results: any[]) {
  return results.sort((a, b) => b.score - a.score);
}