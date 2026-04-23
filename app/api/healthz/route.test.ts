import { GET } from './route'
import { describe, it, expect } from 'vitest'

describe('GET /api/healthz', () => {
  it('returns 200 with status ok', async () => {
    const res = await GET()
    const body = await res.json()
    expect(res.status).toBe(200)
    expect(body.status).toBe('ok')
  })
})
