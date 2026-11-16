import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('./main.css', import.meta.url), 'utf8')

// The custom properties of :root, with the dark block's on top for dark mode.
function tokensOf(scheme: 'light' | 'dark'): Record<string, string> {
  const props = (block: string) =>
    Object.fromEntries([...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2]!.trim()]))
  const light = props(css.match(/^:root\s*\{([^}]*)\}/m)?.[1] ?? '')
  const dark = props(css.match(/prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]*)\}/)?.[1] ?? '')
  return scheme === 'light' ? light : { ...light, ...dark }
}

// WCAG 2 contrast ratio of two #rrggbb colours.
function contrastRatio(a: string, b: string): number {
  const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!
  }
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi! + 0.05) / (lo! + 0.05)
}

describe('contrastRatio', () => {
  it('is 21 for black on white and 1 for a colour on itself', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(contrastRatio('#1f8a70', '#1f8a70')).toBeCloseTo(1, 5)
  })
})

// Buttons keep WCAG AA for normal text (4.5:1) in both modes, at rest and on hover.
describe('button colours', () => {
  for (const scheme of ['light', 'dark'] as const) {
    it(`stay readable in ${scheme} mode`, () => {
      const t = tokensOf(scheme)
      for (const name of ['--button', '--button-hover', '--on-button']) expect(t[name]).toMatch(/^#[0-9a-f]{6}$/i)
      expect(contrastRatio(t['--on-button']!, t['--button']!)).toBeGreaterThanOrEqual(4.5)
      expect(contrastRatio(t['--on-button']!, t['--button-hover']!)).toBeGreaterThanOrEqual(4.5)
    })
  }
})
