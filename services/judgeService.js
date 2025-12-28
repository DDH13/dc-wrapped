import * as repo from '../repositories/judgeRepository.js'

export async function listJudgeProfiles() {
  return repo.getAllJudgeProfiles()
}

export async function getJudge(id) {
  return repo.getJudgeProfileById(id)
}

export async function getJudgeByJudgeId(judgeId) {
  return repo.getJudgeByJudgeId(judgeId)
}

export async function getJudgeByCode(code) {
  return repo.getJudgeByCode(code)
}

export async function updateJudgeTraits(code, traits) {
  if (!code) throw new Error('code required');

  const judge = await repo.getJudgeByCode(code);
  if (!judge) return null; 

  const validTraits = {
    personality: traits.personality || null,
    manner: traits.manner ?? null,
    matter: traits.matter ?? null,
    method: traits.method ?? null,
    attitude: traits.attitude ?? null,
  };

  return await repo.updatePersonalityTraits(code, validTraits);
}



export async function addJudge(data) {
  if (!data.firstName) throw new Error('firstName required')
  if (!data.judgeId) throw new Error('judgeId required')
  
  return repo.createJudge(
    data.judgeId,
    data.firstName,
    data.lastName || null,
    data.email || null
  )
}

export async function updateJudge(id, data) {
  if (!id) throw new Error('id required')
  return repo.updateJudge(id, data)
}

export async function removeJudge(id) {
  if (!id) throw new Error('id required')
  return repo.deleteJudge(id)
}

export async function getJudgeFullNamesByPersonality(personality) {
  return repo.getFullNamesByPersonality(personality)
}