import dotenv from 'dotenv'
dotenv.config()

const validKeys = new Set([
  process.env.API_KEY_DINETH,
  process.env.API_KEY_DANIEL,
  process.env.API_KEY_SANDIL,
])

export function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key']

  if (!apiKey || !validKeys.has(apiKey)) {
    return res.status(403).json({ error: 'Forbidden: invalid API key' })
  }

  req.user = { apiKey }
  next()
}
