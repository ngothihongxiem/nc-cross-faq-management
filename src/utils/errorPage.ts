export interface ErrorText {
  title: string
  lead: string
}

// What the error page says: a page that does not exist, or anything else that went wrong.
export function errorText(statusCode: number | undefined): ErrorText {
  if (statusCode === 404) return { title: 'ページが見つかりません', lead: 'URL をご確認ください。' }
  return { title: 'エラーが発生しました', lead: '時間をおいて、もう一度お試しください。' }
}
