import { Router } from "express"
const router = Router()
import { listDebaterProfiles, getDebaterByEmail, updateDebaterTraits, getDebaterFullNamesByPersonality } from '../services/debaterService.js' 
import { getJudgeFullNamesByPersonality, getJudgeByCode } from "../services/judgeService.js"
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
    const updated = await updateDebaterTraits(email, req.body)
    if (!updated) {
      return res.status(404).json({ error: 'Debater not found' });
    }
    res.json({ message: 'Update successful', data: updated });
  } catch (err) {
    next(err); 
  }
})

router.get('/personality/find/:personality', async (req, res, next) => {
  try {
    const personality = req.params.personality
    const debaterFullNames = await getDebaterFullNamesByPersonality(personality)
    const judgeFullNames = await getJudgeFullNamesByPersonality(personality)
    const people = {debaterFullNames, judgeFullNames}
    res.status(200).json(people)
  } catch (err) {
    next(err)
  } 
})

router.get('/personality/findby/:type/:credential', async (req, res, next) => {
  try {
    const { type, credential } = req.params
    let people = {}
    if (type === 'debater') {
      const debater  = await getDebaterByEmail(decodeURIComponent(credential))
      if (!debater) {
        return res.status(404).json({ message: 'Debater not found' })
      }
      if (!debater.personality) {
        return res.status(404).json({ message: 'Personality traits not set for this debater' })
      }
      people.debaterFullNames = await getDebaterFullNamesByPersonality(debater.personality)
      people.judgeFullNames = await getJudgeFullNamesByPersonality(debater.personality)
    } else if (type === 'judge') {
      const judge  = await getJudgeByCode(decodeURIComponent(credential))
      if (!judge) {
        return res.status(404).json({ message: 'Judge not found' })
      }
      if (!judge.personality) {
        return res.status(404).json({ message: 'Personality traits not set for this judge' })
      }
      people.debaterFullNames = await getDebaterFullNamesByPersonality(judge.personality)
      people.judgeFullNames = await getJudgeFullNamesByPersonality(judge.personality)
    } else {
      return res.status(400).json({ message: 'Invalid type parameter' })
    }
    res.status(200).json(people)
  } catch (err) {
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