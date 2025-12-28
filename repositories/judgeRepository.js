import { query } from '../db/pool.js'

export async function getAllJudgeProfiles() {
  const result = await query('SELECT * FROM judge_profile')
  return result.rows
}

export async function getJudgeProfileById(id) {
  const result = await query('SELECT * FROM judge_profile WHERE id = $1', [id])
  return result.rows[0] || null
}

export async function getJudgeByCode(code) {
  const result = await query('SELECT * FROM judge_profile WHERE code = $1', [code])
  return result.rows[0] || null
}

export async function updatePersonalityTraits(code, traits) {
  const result = await query(
    `UPDATE judge_profile
      SET personality = $1,
          manner = $2,
          matter = $3,
          method = $4,
          attitude = $5
      WHERE code = $6
      RETURNING *`,
    [
      traits.personality,
      traits.manner,
      traits.matter,
      traits.method,
      traits.attitude,
      code
    ]
  )
  return result.rows[0] || null
}

export async function getJudgeByJudgeId(judgeId) {
  const result = await query('SELECT * FROM judge_profile WHERE judge_id = $1', [judgeId])
  return result.rows[0] || null
}

export async function deleteJudgeProfile(id) {
  const result = await query('DELETE FROM judge_profile WHERE id = $1 RETURNING *', [id])
  return result.rows[0] || null
}

export async function getFullNamesByPersonality(personality) {
  const result = await query(
    'SELECT first_name, last_name FROM judge_profile WHERE personality = $1 order BY (prelims_judged+breaks_judged) DESC LIMIT 10',
    [personality]
  )
  if (result.rows.length === 0) { return null }
  return result.rows.map(row => `${row.first_name} ${row.last_name || ''}`.trim())
}