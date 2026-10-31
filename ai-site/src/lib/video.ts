/** Resolves a supplied demo-video URL into a lazy embeddable source. */

export type ResolvedVideo =
  | { kind: 'youtube'; embedUrl: string }
  | { kind: 'vimeo'; embedUrl: string }
  | { kind: 'file'; embedUrl: string }
  | { kind: 'unsupported' };

/**
 * Supports YouTube (watch, youtu.be, shorts, embed), Vimeo, and direct
 * video files (.mp4/.webm/.ogg). Returns null for an empty URL and
 * `unsupported` for anything the site cannot responsibly embed.
 */
export function resolveVideoUrl(rawUrl: string): ResolvedVideo | null {
  const url = rawUrl.trim();
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { kind: 'unsupported' };
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { kind: 'unsupported' };
  }

  const host = parsed.hostname.replace(/^www\./, '').toLowerCase();

  // YouTube
  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    const id =
      parsed.searchParams.get('v') ??
      parsed.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{6,})/)?.[1] ??
      null;
    if (id)
      return {
        kind: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
      };
    return { kind: 'unsupported' };
  }
  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1).split('/')[0];
    if (/^[\w-]{6,}$/.test(id)) {
      return {
        kind: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
      };
    }
    return { kind: 'unsupported' };
  }

  // Vimeo
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = parsed.pathname.match(/^\/(?:video\/)?(\d+)/)?.[1];
    if (id) return { kind: 'vimeo', embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1` };
    return { kind: 'unsupported' };
  }

  // Direct video file
  if (/\.(mp4|webm|ogv|ogg)$/i.test(parsed.pathname)) {
    return { kind: 'file', embedUrl: parsed.toString() };
  }

  return { kind: 'unsupported' };
}
