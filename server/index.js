import express from "express";
import { Sequelize } from "sequelize";
import { sequelize } from "./services/database/db.js";
import route from './routes/index.js'
import { user_add, user_details } from "./services/database/bootstrap.js";
import Account from "./models/Account.js";
import Assignment from "./models/Assignment.js";
import AccountAssignmentMap from "./models/Account-Assignment-Map.js";

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


route(app)

app.listen(PORT,()=>{
    console.log('server is running')
})

export default app;
