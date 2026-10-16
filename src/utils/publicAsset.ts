/** Resolve a public asset URL for local development and GitHub Pages subpaths. */
export function publicAsset(path: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(path) || /^(?:data|blob):/i.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const relativePath = path.replace(/^\/+/, '');
  return `${base.endsWith('/') ? base : `${base}/`}${relativePath}`;
}
