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

export async function getJudgeByJudgeId(judgeId) {
  const result = await query('SELECT * FROM judge_profile WHERE judge_id = $1', [judgeId])
  return result.rows[0] || null
}

export async function deleteJudgeProfile(id) {
  const result = await query('DELETE FROM judge_profile WHERE id = $1 RETURNING *', [id])
  return result.rows[0] || null
}
