import { Router } from "express"
const router = Router()
import { listJudgeProfiles, getJudge, addJudge, updateJudge, removeJudge } from '../services/judgeService.js'
import { getJudgeByCode } from "../repositories/judgeRepository.js"

router.use(logger)

router.get('/', async (req, res, next) => {
  try {
    const judges = await listJudgeProfiles()
    res.json(judges)
  } catch (err) {
    next(err)
  }
})

router.get('/code/:code', async (req, res, next) => {
  try {
    const code = decodeURIComponent(req.params.code)

    const judge = await getJudgeByCode(code)
    if (!judge) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json(judge)
  } catch (err) {
    next(err)
  }
})

router.post('/personality/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const updated = await updateJudgeTraits(code, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Judge not found' });
    }

    res.json({ message: 'Update successful', data: updated });
  } catch (err) {
    next(err); 
  }
});
// router.post('/', async (req, res, next) => {
//   try {
//     const created = await addJudge(req.body)
//     res.status(201).json(created)
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/:id', async (req, res, next) => {
//   try {
//     const updated = await updateJudge(req.params.id, req.body)
//     if (!updated) return res.status(404).send('Not found')
//     res.json(updated)
//   } catch (err) {
//     next(err)
//   }
// })

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const deleted = await removeJudge(req.params.id)
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