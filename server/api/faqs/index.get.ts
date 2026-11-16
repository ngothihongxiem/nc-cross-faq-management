import { PER_PAGE, parseListQuery, toRouteQuery } from '#shared/utils/listQuery'
import type { components } from '../../types/backend'
import { fromBackend } from '../../utils/backend'

export default defineEventHandler((event) => {
  const query = parseListQuery(getQuery(event))
  return fromBackend<components['schemas']['FaqPage']>(
    useRuntimeConfig(event).backendUrl,
    '/admin/v1/faqs',
    { ...toRouteQuery(query), per_page: String(PER_PAGE) },
  )
})
