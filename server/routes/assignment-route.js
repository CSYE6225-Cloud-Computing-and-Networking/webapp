import express from 'express'
const router = express.Router()
import * as assignmentController from '../controller/assignment-controller.js'
import { verifyToken } from '../services/util/verify-account.js';

router.get('/v3/assignment', verifyToken, assignmentController.list);
router.get('/v3/assignment/:id', verifyToken, assignmentController.get )

router.post('/v3/assignment', verifyToken, assignmentController.create);
router.put('/v3/assignment/:id', verifyToken, assignmentController.update)
router.delete('/v3/assignment/:id', verifyToken, assignmentController.del)
router.post('/v3/assignment/:id/submission', verifyToken, assignmentController.submission)

router.all('/v3/assignment',(req,res)=>{
    res.set('Cache-control', `no-store`)
    res.status(405)
    res.send()
})

router.all('/v3/assignment/:id',(req,res)=>{
    res.set('Cache-control', `no-store`)
    res.status(405)
    res.send()
}) 


export default router
