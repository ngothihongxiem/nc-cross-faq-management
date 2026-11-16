import { describe, expect, it } from 'vitest'
import { NAV_ITEMS, isActive } from './navigation'

describe('NAV_ITEMS', () => {
  it('lists FAQ, then ユーザー', () => {
    expect(NAV_ITEMS.map((item) => item.label)).toEqual(['FAQ', 'ユーザー'])
    expect(NAV_ITEMS.map((item) => item.to)).toEqual(['/faqs', '/users'])
  })
})

describe('isActive', () => {
  it('marks the item on its own page', () => {
    expect(isActive('/faqs', '/faqs')).toBe(true)
    expect(isActive('/faqs', '/faqs/')).toBe(true)
  })

  it('marks the item on a page under it', () => {
    expect(isActive('/faqs', '/faqs/KOYOU-18')).toBe(true)
  })

  it('never marks it on a look-alike path', () => {
    expect(isActive('/faqs', '/faqsx')).toBe(false)
  })

  it('never marks it on another item', () => {
    expect(isActive('/faqs', '/users')).toBe(false)
  })
})
