import type { components } from '../../types/backend'
import { fromBackend } from '../../utils/backend'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') ?? ''
  return fromBackend<components['schemas']['FaqDetailResponse']>(
    useRuntimeConfig(event).backendUrl,
    `/admin/v1/faqs/${encodeURIComponent(id)}`,
  )
})
