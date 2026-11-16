// How a failed backend call reaches the browser: its own status where the app can act on it.
export interface BackendError {
  statusCode: number
  statusMessage: string
}

export function backendError(status: number | undefined): BackendError {
  if (status === undefined) return { statusCode: 503, statusMessage: 'Backend unreachable' }
  if (status === 404) return { statusCode: 404, statusMessage: 'Not found' }
  if (status === 422) return { statusCode: 400, statusMessage: 'Bad request' }
  if (status === 503) return { statusCode: 503, statusMessage: 'Backend unavailable' }
  return { statusCode: 502, statusMessage: 'Backend error' }
}

// The HTTP status a failed fetch got back; none when the backend never answered.
export function statusOf(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null || !('statusCode' in error)) return undefined
  return typeof error.statusCode === 'number' ? error.statusCode : undefined
}
