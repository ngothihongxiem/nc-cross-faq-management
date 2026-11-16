import { describe, expect, it } from 'vitest'
import { MAX_PAGE, MAX_Q, parseListQuery, toRouteQuery } from './listQuery'

describe('parseListQuery', () => {
  it('is the first page with no filters when the URL has none', () => {
    expect(parseListQuery({})).toEqual({ page: 1 })
  })

  it('trims the filters and drops the empty ones', () => {
    expect(parseListQuery({ q: '  休暇 ', department: '', category: '  ' })).toEqual({ q: '休暇', page: 1 })
  })

  it('keeps a known state and drops any other', () => {
    expect(parseListQuery({ state: 'retired' }).state).toBe('retired')
    expect(parseListQuery({ state: 'deleted' }).state).toBeUndefined()
  })

  it('reads the page as a whole number from 1, else the first page', () => {
    expect(parseListQuery({ page: '3' }).page).toBe(3)
    for (const page of ['0', '-2', 'abc', '2.5', '', null]) expect(parseListQuery({ page }).page).toBe(1)
  })

  it('drops a category with no department: a name can repeat across departments', () => {
    expect(parseListQuery({ category: '勤怠' })).toEqual({ page: 1 })
    expect(parseListQuery({ department: 'payroll', category: '勤怠' }).category).toBe('勤怠')
  })

  it("cuts the search to the backend's limit", () => {
    expect(parseListQuery({ q: 'あ'.repeat(250) }).q).toBe('あ'.repeat(MAX_Q))
  })

  it('reads a page past the last allowed one as the first page', () => {
    expect(parseListQuery({ page: String(MAX_PAGE) }).page).toBe(MAX_PAGE)
    for (const page of [String(MAX_PAGE + 1), '99999999999999999999']) expect(parseListQuery({ page }).page).toBe(1)
  })

  it('takes the first of a repeated key', () => {
    expect(parseListQuery({ q: ['a', 'b'], page: ['4', '5'] })).toEqual({ q: 'a', page: 4 })
  })
})

describe('toRouteQuery', () => {
  it('leaves out empty filters and the first page', () => {
    expect(toRouteQuery({ q: 'x', page: 1 })).toEqual({ q: 'x' })
    expect(toRouteQuery({ department: 'legal', state: 'draft', page: 2 })).toEqual({
      department: 'legal',
      state: 'draft',
      page: '2',
    })
  })

  it('reads back as the same query', () => {
    const query = { q: '交通費', department: 'payroll', category: '勤怠', state: 'published' as const, page: 3 }
    expect(parseListQuery(toRouteQuery(query))).toEqual(query)
  })
})
