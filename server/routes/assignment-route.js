import express from 'express'
const router = express.Router()
import * as assignmentController from '../controller/assignment-controller.js'
import { verifyToken } from '../services/util/verify-account.js';

router.get('/v2/assignment', verifyToken, assignmentController.list);
router.get('/v1/assignment/:id', verifyToken, assignmentController.get )

router.post('/v1/assignment', verifyToken, assignmentController.create);
router.put('/v1/assignment/:id', verifyToken, assignmentController.update)
router.delete('/v1/assignment/:id', verifyToken, assignmentController.del)
router.post('/v1/assignment/:id/submission', verifyToken, assignmentController.submission)

router.all('/v1/assignment',(req,res)=>{
    res.set('Cache-control', `no-store`)
    res.status(405)
    res.send()
})

router.all('/v1/assignment/:id',(req,res)=>{
    res.set('Cache-control', `no-store`)
    res.status(405)
    res.send()
}) 


export default router
