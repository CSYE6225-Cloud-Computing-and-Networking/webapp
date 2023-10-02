//controller for health check
import { setResponse, setError } from "../../services/util/response.js"
import { database_check } from "../../services/util/health-service.js"
import { sequelize } from "../../services/database/db.js"

export const health = async(req,res)=>{

    try{
        let data = req.body;
        let par = req.query;

        if(Object.keys(par).length !=0 || Object.keys(data).length !=0 ){
            res.set('Cache-control', `no-store`)
            res.status(400)
            res.send()
        }
        else{
            await sequelize.authenticate()
            res.set('Cache-control', `no-store`)
            res.status(200)
            res.send()
        }
    }
    catch(err){
        res.set('Cache-control', `no-store`)
        res.status(503)
        res.send()
    }
}   
