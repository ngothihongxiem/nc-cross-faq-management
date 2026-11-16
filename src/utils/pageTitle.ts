export const APP_NAME = '管理部横断FAQ 管理'

// The browser tab's title: 「FAQ｜管理部横断FAQ 管理」, or the app name alone.
export function pageTitle(title: string | undefined): string {
  return title ? `${title}｜${APP_NAME}` : APP_NAME
}
