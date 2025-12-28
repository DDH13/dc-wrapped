import * as repo from '../repositories/debaterRepository.js'

export async function listDebaterProfiles() {
  return repo.getAllDebaterProfiles()
}

export async function getDebater(id) {
  return repo.getDebaterProfileById(id)
}

export async function getDebaterByDebaterId(debaterId) {
  return repo.getDebaterByDebaterId(debaterId)
}

export async function getDebaterByEmail(email) {
  return repo.getDebaterByEmail(email)
}

export async function addDebater(data) {
  if (!data.firstName) throw new Error('firstName required')
  if (!data.debaterId) throw new Error('debaterId required')
  
  return repo.createDebater(
    data.debaterId,
    data.firstName,
    data.lastName || null,
    data.email || null
  )
}

export async function updateDebaterTraits(email, traits) {
  if (!email) throw new Error('email required')

  // check if debater exists
  let debater = await repo.getDebaterByEmail(email)
  if (!debater) return null

  // validate traits fields or set null
  const validTraits = {
    personality: traits.personality || null,
    manner: traits.manner ?? null,
    matter: traits.matter ?? null,
    method: traits.method ?? null,
    attitude: traits.attitude ?? null,
  };
  return await repo.updatePersonalityTraits(email, validTraits)
}      

export async function updateDebater(id, data) {
  if (!id) throw new Error('id required')
  return repo.updateDebater(id, data)
}

export async function removeDebater(id) {
  if (!id) throw new Error('id required')
  return repo.deleteDebater(id)
}

export async function getDebaterFullNamesByPersonality(personality) {
  return repo.getFullNamesByPersonality(personality)
}
