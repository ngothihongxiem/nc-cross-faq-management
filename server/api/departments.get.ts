import type { components } from '../types/backend'
import { fromBackend } from '../utils/backend'

export default defineEventHandler((event) =>
  fromBackend<components['schemas']['DepartmentItem'][]>(
    useRuntimeConfig(event).backendUrl,
    '/admin/v1/departments',
  ),
)
