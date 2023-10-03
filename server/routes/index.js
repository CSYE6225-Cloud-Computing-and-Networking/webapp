import healthRouter from './util/health-router.js'
import assignmentRouter from './assignment-route.js'
import accountRouter from './account-route.js'

export default(app)=>{
    app.use('/',healthRouter),
    app.use('/',assignmentRouter),
    app.use('/',accountRouter)
}
