import express from 'express'
const router = express.Router()
import * as assignmentController from '../controller/assignment-controller.js'
import { verifyToken } from '../services/util/verify-account.js';

router.get('/v1/assignment', assignmentController.list);
router.get('/v1/assignment/:id', assignmentController.get )

router.post('/v1/assignment', verifyToken, assignmentController.create);
router.put('/v1/assignment/:id', assignmentController.create)
router.delete('/v1/assignment/:id', verifyToken, assignmentController.del)

export default router
