import express from 'express'
const router = express.Router()
import * as accountController from '../controller/assignment-controller.js'

router.get('/v1/account', accountController.list);
router.post('/v1/account', accountController.create);

export default router
