// The side menu. Each item stays marked on the pages under it (a FAQ's own page under /faqs).
export interface NavItem {
  to: string
  label: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: '/faqs', label: 'FAQ' },
  { to: '/users', label: 'ユーザー' },
]

export function isActive(to: string, path: string): boolean {
  return path === to || path.startsWith(`${to}/`)
}
