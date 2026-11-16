// The FAQ list's filters and page, as the URL and the backend carry them. Shared by the page and
// its server route, so both read the URL the same way.
export const FAQ_STATES = ['published', 'draft', 'retired'] as const
export type FaqState = (typeof FAQ_STATES)[number]

export const PER_PAGE = 50
// The backend's limits: a longer search or a later page is refused there.
export const MAX_Q = 200
export const MAX_PAGE = 10_000

export interface ListQuery {
  q?: string
  department?: string
  category?: string
  state?: FaqState
  page: number
}

function first(value: unknown): string | undefined {
  const one = Array.isArray(value) ? value[0] : value
  return typeof one === 'string' ? one : undefined
}

function text(value: unknown): string | undefined {
  return first(value)?.trim() || undefined
}

function isState(value: string | undefined): value is FaqState {
  return (FAQ_STATES as readonly string[]).includes(value ?? '')
}

export function parseListQuery(raw: Record<string, unknown>): ListQuery {
  const query: ListQuery = { page: 1 }
  const q = text(raw.q)
  const department = text(raw.department)
  const category = text(raw.category)
  const state = text(raw.state)
  if (q) query.q = q.slice(0, MAX_Q)
  if (department) query.department = department
  // A category name can repeat across departments: it only filters within one.
  if (department && category) query.category = category
  if (isState(state)) query.state = state
  const page = Number(first(raw.page))
  if (Number.isSafeInteger(page) && page >= 1 && page <= MAX_PAGE) query.page = page
  return query
}

export function toRouteQuery(query: ListQuery): Record<string, string> {
  const out: Record<string, string> = {}
  if (query.q) out.q = query.q
  if (query.department) out.department = query.department
  if (query.category) out.category = query.category
  if (query.state) out.state = query.state
  if (query.page > 1) out.page = String(query.page)
  return out
}
