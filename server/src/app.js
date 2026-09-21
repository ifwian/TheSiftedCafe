import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env, isProduction } from './config/env.js'
import routes from './routes/index.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import { generalLimiter } from './middleware/rateLimit.js'

/**
 * app.js builds and configures the Express app. server.js is the only
 * place that actually starts it listening -- keeping the two separate
 * makes the app importable/testable without binding a port (spec
 * section 26).
 */
const app = express()

// Required on Render/Railway/Heroku-style hosts sitting behind a reverse
// proxy, so req.ip (used by rate limiting) reflects the real client IP
// instead of the proxy's (spec section 98 -- production vs. dev config).
app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)
// Body size capped to reduce the blast radius of oversized-payload abuse
// (spec section 64).
app.use(express.json({ limit: '100kb' }))
app.use(express.urlencoded({ extended: true, limit: '100kb' }))

if (!isProduction) {
  app.use(morgan('dev'))
}

app.use('/api', generalLimiter, routes)

app.use(notFound)
app.use(errorHandler)

export default app
