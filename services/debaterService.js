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
  // validate traits fields to be number or set null
  const validTraits = {
    personality: traits.personality || null,
    manner_flashy: traits.manner_flashy || null,
    manner_technical: traits.manner_technical || null,
    matter_creative: traits.matter_creative || null,
    matter_methodical: traits.matter_methodical || null,
    method_adaptive: traits.method_adaptive || null,
    method_rigid: traits.method_rigid || null,
    strategy_offense: traits.strategy_offense || null,
    strategy_defense: traits.strategy_defense || null
  }
  result = repo.updatePersonalityTraits(email, validTraits)
  if (!result) {
    throw new Error('Debater not found')
  }
}      

export async function updateDebater(id, data) {
  if (!id) throw new Error('id required')
  return repo.updateDebater(id, data)
}

export async function removeDebater(id) {
  if (!id) throw new Error('id required')
  return repo.deleteDebater(id)
}
