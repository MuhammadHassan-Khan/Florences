import { describe, expect, it } from 'vitest';

import { resolveVideoUrl } from '@/lib/video';

/** Narrows the union so tests read as plain string assertions. */
function embed(url: string): string {
  const resolved = resolveVideoUrl(url);
  if (!resolved || resolved.kind === 'unsupported') {
    throw new Error(`Expected an embeddable URL for: ${url}`);
  }
  return resolved.embedUrl;
}

describe('resolveVideoUrl', () => {
  it('returns null for an empty URL', () => {
    expect(resolveVideoUrl('')).toBeNull();
    expect(resolveVideoUrl('   ')).toBeNull();
  });

  it('resolves common YouTube URL shapes to a privacy-enhanced embed', () => {
    const expected = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';
    expect(embed('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(expected);
    expect(embed('https://youtu.be/dQw4w9WgXcQ')).toBe(expected);
    expect(embed('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe(expected);
    expect(embed('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(expected);
  });

  it('resolves Vimeo URLs', () => {
    expect(embed('https://vimeo.com/76979871')).toBe(
      'https://player.vimeo.com/video/76979871?autoplay=1',
    );
  });

  it('passes direct video files through', () => {
    expect(embed('https://cdn.example.com/demo/ai-workflow.mp4')).toContain('ai-workflow.mp4');
  });

  it('flags unsupported or unsafe sources instead of embedding them', () => {
    expect(resolveVideoUrl('https://example.com/some-page')).toEqual({ kind: 'unsupported' });
    expect(resolveVideoUrl('javascript:alert(1)')).toEqual({ kind: 'unsupported' });
    expect(resolveVideoUrl('not a url')).toEqual({ kind: 'unsupported' });
  });
});
