import { describe, expect, it } from 'vitest'
import { errorText } from './errorPage'

describe('errorText', () => {
  it('says the page was not found for a 404', () => {
    expect(errorText(404)).toEqual({ title: 'ページが見つかりません', lead: 'URL をご確認ください。' })
  })

  it('says an error happened for anything else', () => {
    const other = { title: 'エラーが発生しました', lead: '時間をおいて、もう一度お試しください。' }
    expect(errorText(500)).toEqual(other)
    expect(errorText(undefined)).toEqual(other)
  })
})
