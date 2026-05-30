import type { Metadata } from 'next'

/**
 * Self-referencing canonical + og:url for a page.
 * Path is normalized to a trailing slash to match the site's
 * canonical URL form (trailingSlash: true in next.config.ts).
 * metadataBase (non-www) in the root layout resolves these to
 * absolute https://rageroomnearme.org/... URLs, which dedupes the
 * www/non-www hosts onto one canonical.
 */
export function pageMeta(path: string): Pick<Metadata, 'alternates' | 'openGraph'> {
  const p = path === '/' ? '/' : (path.endsWith('/') ? path : `${path}/`)
  return {
    alternates: { canonical: p },
    openGraph: { url: p },
  }
}
