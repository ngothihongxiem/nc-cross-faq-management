import { describe, expect, it } from 'vitest'
import { categoryOptions, formatDateTime, pageCount, stateLabel } from './faqView'

describe('stateLabel', () => {
  it('names each state in Japanese', () => {
    expect([stateLabel('published'), stateLabel('draft'), stateLabel('retired')]).toEqual(['公開', '下書き', '廃止'])
  })
})

describe('formatDateTime', () => {
  it('shows the time in Tokyo', () => {
    expect(formatDateTime('2026-11-14T01:30:00Z')).toBe('2026/11/14 10:30')
  })

  it('moves to the next day after 15:00 UTC', () => {
    expect(formatDateTime('2026-12-31T15:00:00+00:00')).toBe('2027/01/01 00:00')
  })
})

describe('pageCount', () => {
  it('is at least one page', () => {
    expect([pageCount(0, 50), pageCount(50, 50), pageCount(51, 50)]).toEqual([1, 1, 2])
  })
})

describe('categoryOptions', () => {
  const departments = [
    { code: 'legal', name: '法務部', categories: ['商標', '契約'] },
    { code: 'payroll', name: '給与・勤怠', categories: ['勤怠'] },
  ]

  it("offers the chosen department's categories", () => {
    expect(categoryOptions(departments, 'legal', '')).toEqual([
      { value: '商標', label: '商標' },
      { value: '契約', label: '契約' },
    ])
  })

  it('shows a chosen category that is not in the department, so the filter is never hidden', () => {
    expect(categoryOptions(departments, 'legal', '勤怠')[0]).toEqual({
      value: '勤怠',
      label: '勤怠（この部署にはありません）',
    })
  })

  it('keeps the chosen category while the departments are not loaded', () => {
    expect(categoryOptions([], 'legal', '勤怠')).toEqual([{ value: '勤怠', label: '勤怠' }])
  })
})
