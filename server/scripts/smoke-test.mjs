/**
 * Smoke test for The Sifted Cafe API (spec section 89 -- API Testing
 * Checklist). Run with the server already running:
 *
 *   npm run test:api
 *
 * This hits a real, running server -- it does not mock anything. Exits
 * with a non-zero code if any check fails, so it can be used in CI later.
 */
import 'dotenv/config'

const BASE_URL = `http://localhost:${process.env.PORT || 5000}/api`

let passed = 0
let failed = 0

async function check(label, fn) {
  try {
    await fn()
    console.log(`✅ ${label}`)
    passed += 1
  } catch (error) {
    console.log(`❌ ${label}`)
    console.log(`   ${error.message}`)
    failed += 1
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function main() {
  console.log(`Running API smoke tests against ${BASE_URL}\n`)

  await check('GET /api/health returns 200 and success shape', async () => {
    const res = await fetch(`${BASE_URL}/health`)
    const body = await res.json()
    assert(res.status === 200, `expected 200, got ${res.status}`)
    assert(body.success === true, 'expected success: true')
  })

  await check('GET /api/menu returns 200 with an array', async () => {
    const res = await fetch(`${BASE_URL}/menu`)
    const body = await res.json()
    assert(res.status === 200, `expected 200, got ${res.status}`)
    assert(Array.isArray(body.data), 'expected data to be an array')
  })

  await check('GET /api/menu/featured returns 200 with an array', async () => {
    const res = await fetch(`${BASE_URL}/menu/featured`)
    const body = await res.json()
    assert(res.status === 200, `expected 200, got ${res.status}`)
    assert(Array.isArray(body.data), 'expected data to be an array')
  })

  await check('GET /api/menu/:id with a bad id returns 404', async () => {
    const res = await fetch(`${BASE_URL}/menu/does-not-exist`)
    assert(res.status === 404, `expected 404, got ${res.status}`)
  })

  await check('GET /api/categories returns 200 with an array', async () => {
    const res = await fetch(`${BASE_URL}/categories`)
    const body = await res.json()
    assert(res.status === 200, `expected 200, got ${res.status}`)
    assert(Array.isArray(body.data), 'expected data to be an array')
  })

  await check('POST /api/reservations rejects invalid data with 422', async () => {
    const res = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'not-an-email', phone: 'x', date: '', time: '', guests: 999 }),
    })
    assert(res.status === 422, `expected 422, got ${res.status}`)
  })

  await check('POST /api/reservations accepts valid data with 201', async () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
    const res = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Smoke Test',
        email: 'smoke-test@example.com',
        phone: '09171234567',
        date: tomorrow,
        time: '19:00',
        guests: 2,
      }),
    })
    const body = await res.json()
    assert(res.status === 201, `expected 201, got ${res.status}`)
    assert(body.data.status === 'PENDING', 'expected new reservation status PENDING')
  })

  await check('POST /api/messages rejects invalid data with 422', async () => {
    const res = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'nope', subject: '', message: 'short' }),
    })
    assert(res.status === 422, `expected 422, got ${res.status}`)
  })

  await check('POST /api/messages accepts valid data with 201', async () => {
    const res = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Smoke Test',
        email: 'smoke-test@example.com',
        subject: 'Automated smoke test',
        message: 'This message was sent by the automated smoke test script.',
      }),
    })
    const body = await res.json()
    assert(res.status === 201, `expected 201, got ${res.status}`)
    assert(body.data.status === 'UNREAD', 'expected new message status UNREAD')
  })

  await check('POST /api/auth/login rejects wrong credentials with 401', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nobody@example.com', password: 'wrong' }),
    })
    assert(res.status === 401, `expected 401, got ${res.status}`)
  })

  await check('GET /api/admin/stats without a token returns 401', async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`)
    assert(res.status === 401, `expected 401, got ${res.status}`)
  })

  await check('GET /api/admin/stats with an invalid token returns 401', async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`, {
      headers: { Authorization: 'Bearer not-a-real-token' },
    })
    assert(res.status === 401, `expected 401, got ${res.status}`)
  })

  console.log(`\n${passed} passed, ${failed} failed`)
  if (failed > 0) process.exitCode = 1
}

main().catch((error) => {
  console.error('Smoke test runner crashed:', error)
  process.exitCode = 1
})
