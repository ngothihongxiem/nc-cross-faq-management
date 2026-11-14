import type { FaqState } from '#shared/utils/listQuery'

const STATE_LABELS: Record<FaqState, string> = { published: '公開', draft: '下書き', retired: '廃止' }

export function stateLabel(state: FaqState): string {
  return STATE_LABELS[state]
}

const TOKYO = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

// 「2026/11/14 10:30」, in Tokyo time wherever the server or the browser runs.
export function formatDateTime(iso: string): string {
  const part = Object.fromEntries(TOKYO.formatToParts(new Date(iso)).map((p) => [p.type, p.value]))
  return `${part.year}/${part.month}/${part.day} ${part.hour}:${part.minute}`
}

export function pageCount(total: number, perPage: number): number {
  return Math.max(1, Math.ceil(total / perPage))
}

export interface DepartmentOption {
  code: string
  name: string
  categories: string[]
}

export interface SelectOption {
  value: string
  label: string
}

// The category filter follows the chosen department (a name can repeat across departments). A
// category from the URL that the department lacks is still shown, so no filter is ever hidden.
export function categoryOptions(
  departments: DepartmentOption[],
  code: string | undefined,
  current: string,
): SelectOption[] {
  const department = departments.find((d) => d.code === code)
  if (!department) return current ? [{ value: current, label: current }] : []
  const options = department.categories.map((c) => ({ value: c, label: c }))
  if (current && !department.categories.includes(current)) {
    options.unshift({ value: current, label: `${current}（この部署にはありません）` })
  }
  return options
}
