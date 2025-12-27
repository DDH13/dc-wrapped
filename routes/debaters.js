import { Router } from "express"
const router = Router()
import { listDebaterProfiles, getDebater, addDebater, updateDebater, removeDebater } from '../services/debaterService.js'
import { getDebaterByEmail } from "../repositories/debaterRepository.js"

router.use(logger)

router.get('/', async (req, res, next) => {
  try {
    const debaters = await listDebaterProfiles()
    res.json(debaters)
  } catch (err) {
    next(err)
  }
})

router.get('/by-email/:email', async (req, res, next) => {
  try {
    const email = decodeURIComponent(req.params.email)

    const debater = await getDebaterByEmail(email)
    if (!debater) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json(debater)
  } catch (err) {
    next(err)
  }
})

router.post('/personality/:email', async (req, res, next) => {
  try {
    const email = decodeURIComponent(req.params.email)
    const traits = req.body
    const updated = await updateDebaterTraits(email, traits)
    if (!updated) return res.status(404).send('Not found')
    res.json(updated)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
// router.post('/', async (req, res, next) => {
//   try {
//     const created = await addDebater(req.body)
//     res.status(201).json(created)
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/:id', async (req, res, next) => {
//   try {
//     const updated = await updateDebater(req.params.id, req.body)
//     if (!updated) return res.status(404).send('Not found')
//     res.json(updated)
//   } catch (err) {
//     next(err)
//   }
// })

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const deleted = await removeDebater(req.params.id)
//     if (!deleted) return res.status(404).send('Not found')
//     res.status(204).send()
//   } catch (err) {
//     next(err)
//   }
// })

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

export default router