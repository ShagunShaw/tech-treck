import { Router } from 'express'
import * as group from '../controller/group.controller'
import { verifyJWT } from '../middlewares/verifyJWT';
import { authorize } from '../middlewares/verifyRole'

const router: Router= Router()

// participant genre register
router.post('/genre', verifyJWT, authorize('participant'), group.registerGenre)

// create groups when game starts (to be handled in detail)
router.post('/', verifyJWT, authorize('participant'), group.createGroup)

// abort the game
router.patch('/abort', verifyJWT, authorize('participant'), group.abort)

Scan QR and solve given question (can have two different routes or can be done in one route only, check accordingly)

export default router;