import app from './app.js'
import { env } from './config/env.js'
import { prisma } from './config/prisma.js'

const server = app.listen(env.port, () => {
  console.log(`The Sifted Cafe API running on port ${env.port}`)
  console.log(`Environment: ${env.nodeEnv}`)
})

// Serverless platforms (Vercel) and container hosts (Render) terminate
// instances with SIGTERM. Without an explicit handler the process is
// killed immediately and in-flight requests are cut off, and the Prisma
// connection pool is never drained -- which on Postgres shows up as
// dangling sessions. Close the listener first, then release the pool.
let shuttingDown = false

async function shutdown(signal) {
  if (shuttingDown) return
  shuttingDown = true

  console.log(`\n${signal} received, shutting down gracefully...`)

  // Give in-flight requests a bounded window to finish. The forced exit
  // guarantees the process still dies on a hung connection.
  const forceExit = setTimeout(() => {
    console.error('Graceful shutdown timed out, forcing exit.')
    process.exit(1)
  }, 10000)
  forceExit.unref()

  server.close(async (err) => {
    if (err) {
      console.error('Error while closing the HTTP server:', err)
      process.exit(1)
    }

    try {
      await prisma.$disconnect()
      console.log('Database connections closed.')
      clearTimeout(forceExit)
      process.exit(0)
    } catch (dbErr) {
      console.error('Error while disconnecting from the database:', dbErr)
      process.exit(1)
    }
  })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

// An unhandled rejection leaves the process in an undefined state; log it
// and shut down cleanly instead of continuing to serve traffic.
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason)
  shutdown('unhandledRejection')
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err)
  process.exit(1)
})