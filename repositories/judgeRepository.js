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
          manner_flashy = $2,
          manner_technical = $3,
          matter_creative = $4,
          matter_methodical = $5,
          method_adaptive = $6,
          method_rigid = $7,
          strategy_offense = $8,
          strategy_defense = $9
      WHERE code = $10
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
