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
          manner_flashy = $2,
          manner_technical = $3,
          matter_creative = $4,
          matter_methodical = $5,
          method_adaptive = $6,
          method_rigid = $7,
          strategy_offense = $8,
          strategy_defense = $9
      WHERE email = $10
      RETURNING *`,
    [
      traits.personality,
      traits.manner_flashy,
      traits.manner_technical,
      traits.matter_creative,
      traits.matter_methodical,
      traits.method_adaptive,
      traits.method_rigid,
      traits.strategy_offense,
      traits.strategy_defense,
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
