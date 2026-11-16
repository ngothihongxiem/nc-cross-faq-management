import { describe, expect, it } from 'vitest'
import { APP_NAME, pageTitle } from './pageTitle'

describe('pageTitle', () => {
  it('puts the page before the app name', () => {
    expect(pageTitle('FAQ')).toBe('FAQ｜管理部横断FAQ 管理')
  })

  it('is the app name alone when the page has no title', () => {
    expect(pageTitle(undefined)).toBe(APP_NAME)
    expect(pageTitle('')).toBe(APP_NAME)
    expect(APP_NAME).toBe('管理部横断FAQ 管理')
  })
})
