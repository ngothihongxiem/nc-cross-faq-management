import { backendError, statusOf } from './backendError'

// Calls the backend's admin API; a failure becomes an error the app's pages understand.
export async function fromBackend<T>(
  backendUrl: string,
  path: string,
  query?: Record<string, string>,
): Promise<T> {
  try {
    // Typed by the backend's own schema (types/backend.d.ts), not Nitro's routes.
    return (await $fetch(path, { baseURL: backendUrl, query })) as T
  } catch (error) {
    throw createError(backendError(statusOf(error)))
  }
}
