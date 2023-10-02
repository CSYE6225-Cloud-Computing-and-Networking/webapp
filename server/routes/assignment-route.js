import express from 'express'
const router = express.Router()
import * as assignmentController from '../controller/assignment-controller.js'

router.get('/v1/assignment', assignmentController.list);
router.get('/v1/assignment/:id', assignmentController.get )

router.post('/v1/assignment', assignmentController.create);
router.put('/v1/assignment/:id', assignmentController.create)
router.delete('/v1/assignment/:id', assignmentController.del)

export default router
