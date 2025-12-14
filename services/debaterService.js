import * as repo from '../repositories/debaterRepository.js'

export async function listDebaters() {
  return repo.getAllDebaters()
}

export async function getDebater(id) {
  return repo.getDebaterById(id)
}

export async function addDebater(data) {
  if (!data.firstName) throw new Error('firstName required')
  return repo.createDebater(data.firstName, data.lastName || null)
}
