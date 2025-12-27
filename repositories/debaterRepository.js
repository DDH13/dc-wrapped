import { query } from '../db/pool.js'

export async function getAllDebaterProfiles() {
  const result = await query('SELECT * FROM debater_profile')
  return result.rows
}

export async function getDebaterProfileById(id) {
  const result = await query('SELECT * FROM debater_profile WHERE id = $1', [id])
  return result.rows[0] || null
}

export async function updatePersonalityTraits(email, traits) {
  const result = await query(
    `UPDATE debater_profile 
     SET personality = $1,
          manner = $2,
          matter = $3,
          method = $4,
          attitude = $5
      WHERE email = $6
      RETURNING *`,
    [
      traits.personality,
      traits.manner,
      traits.matter,
      traits.method,
      traits.attitude,
      email
    ]
  )
  return result.rows[0] || null
}

export async function getDebaterByEmail(email) {
  const result = await query('SELECT * FROM debater_profile WHERE email = $1', [email])
  return result.rows[0] || null
}

export async function getDebaterByDebaterId(debaterId) {
  const result = await query('SELECT * FROM debater_profile WHERE debater_id = $1', [debaterId])
  return result.rows[0] || null
}


export async function updateEmailByDebaterId(debaterId, email) {
  const result = await query(
    'UPDATE debater_profile SET email = $1 WHERE debater_id = $2 RETURNING *',
    [email, debaterId]
  )
  return result.rows[0] || null
}

export async function deleteDebaterProfile(id) {
  const result = await query('DELETE FROM debater_profile WHERE id = $1 RETURNING *', [id])
  return result.rows[0] || null
}
