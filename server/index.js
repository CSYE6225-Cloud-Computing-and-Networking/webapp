import express from "express";
import { Sequelize } from "sequelize";
import { sequelize } from "./services/database/db.js";
import route from './routes/index.js'
import { user_add, user_details } from "./services/database/bootstrap.js";
import Account from "./models/Account.js";
import Assignment from "./models/Assignment.js";
import AccountAssignmentMap from "./models/Account-Assignment-Map.js";
import Statsd from 'node-statsd'
import { createLogger, transports, format } from "winston";

let statsd = new Statsd();

//logger setup
const logger = createLogger({
  transports: [new transports.File({
    filename: 'webapp.log',
  }),],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});




//Bootstrap
try{
  let sq_call = async()=>{
    await sequelize.sync();
  }
  await sq_call()
  user_details();
}
catch(err){
  console.log("Bootstap error")
}

let PORT = 8000
let app = express()


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use((req,res,next)=>{
  req.statsd = statsd;
  next();
})
app.use((req, res, next) => {     
  logger.info(`Requesting ${req.method} ${req.originalUrl}`);      
  statsd.increment(`${req.method}_${req.originalUrl}_count`);
  next()      
})


route(app)

app.listen(PORT,()=>{
  logger.info('server is running')
})

export default app;
