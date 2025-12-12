import { Router } from "express"
const router = Router()
import { listDebaters, getDebater, addDebater } from '../services/debaterService.js'
import { apiKeyAuth } from '../middleware/apiKeyAuth.js'

router.use(logger)

router.get('/', async (req, res, next) => {
  try {
    const debaters = await listDebaters()
    res.json(debaters)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const debater = await getDebater(req.params.id)
    if (!debater) return res.status(404).send('Not found')
    res.json(debater)
  } catch (err) {
    next(err)
  }
})


router.post('/add', apiKeyAuth, async (req, res, next) => {
  try {
    const created = await addDebater(req.body)
    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', apiKeyAuth, async (req, res, next) => {
  try {
    const updated = await service.updateDebater(req.params.id, req.body)
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

export default router