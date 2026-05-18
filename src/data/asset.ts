/**
 * Resolve a path inside a candidate's `public/candidates/<id>/` folder
 * to a URL that works under any Vite `base` (dev = "/", prod = "/test-task/").
 */
export function candidateAsset(candidateId: string, relativePath: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = relativePath.replace(/^\/+/, '');
  return `${base}/candidates/${candidateId}/${clean}`;
}
