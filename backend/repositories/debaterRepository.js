import { query } from '../db/pool.js'

export async function getAllDebaters() {
  const result = await query('SELECT * FROM debater')
  return result.rows
}

export async function getDebaterById(id) {
  const result = await query('SELECT * FROM debater WHERE id = $1', [id])
  return result.rows[0] || null
}

export async function createDebater(firstName, lastName) {
  const result = await query(
    'INSERT INTO debater (first_name, last_name) VALUES ($1, $2) RETURNING *',
    [firstName, lastName]
  )
  return result.rows[0]
}
