import express from "express";

import route from './routes/index.js'


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