import express from "express";
import { sequelize } from "./services/database/db.js";
import route from './routes/index.js'
import { user_add, user_details } from "./services/database/bootstrap.js";

//Bootstrap
try{
  sequelize.sync();
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
