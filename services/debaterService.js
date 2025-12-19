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

export async function updateDebater(id, data) {
  if (!id) throw new Error('id required')
  return repo.updateDebater(id, data)
}

export async function removeDebater(id) {
  if (!id) throw new Error('id required')
  return repo.deleteDebater(id)
}
