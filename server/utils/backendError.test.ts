import { describe, expect, it } from 'vitest'
import { backendError, statusOf } from './backendError'

describe('backendError', () => {
  it('passes on a 404 and a 503', () => {
    expect(backendError(404).statusCode).toBe(404)
    expect(backendError(503).statusCode).toBe(503)
  })

  it('turns a refused request into a 400', () => {
    expect(backendError(422).statusCode).toBe(400)
  })

  it('is a 503 when the backend cannot be reached', () => {
    expect(backendError(undefined)).toEqual({ statusCode: 503, statusMessage: 'Backend unreachable' })
  })

  it('is a 502 for anything else', () => {
    expect(backendError(500).statusCode).toBe(502)
  })
})

describe('statusOf', () => {
  it('reads the status of a failed fetch, if it got an answer', () => {
    expect(statusOf({ statusCode: 404 })).toBe(404)
    expect(statusOf({ statusCode: undefined })).toBeUndefined()
    expect(statusOf(new Error('ECONNREFUSED'))).toBeUndefined()
    expect(statusOf(null)).toBeUndefined()
  })
})
