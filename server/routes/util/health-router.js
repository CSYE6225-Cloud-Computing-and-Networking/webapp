import express from 'express'
import { health } from '../../controller/util/health-controller.js'

const router = express.Router()

router.get('/healthz', health).all('/healthz',(req,res)=>{
    res.set('Cache-control', `no-store`)
    res.status(405)
    res.send()
}) 

// router.all('*', (req, res) => {
//     res.set('Cache-control', `no-store`)
//     res.status(404)
//     res.send()
// });

export default router
