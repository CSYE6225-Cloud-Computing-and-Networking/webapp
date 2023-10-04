//controller for assignment check
import { setError, setResponse } from "../services/util/response.js";
import { sequelize } from "../services/database/db.js";

import * as assignmentService from "../services/assignment-service.js"

export const create = async(req,res)=>{

    try{
        let req_body = req.body 

        let account = req.account
        let account_id = account.id;
        console.log('account id',account_id)
        let savedAssignment = await assignmentService.save(req_body, account.id)
        setResponse(savedAssignment, res, savedAssignment.status)
    }
    catch(err){
        setError(err,res)
    }
}

export const list = async(req,res)=>{

    try{
        let assignment_list = await assignmentService.list();
        setResponse(assignment_list, res)
    }
    catch(err){
        setError(err,res)
    }
}

export const get = async (req,res)=>{
    let id = req.params.id
    console.log('assignment id',id)
    try{
        let assignment  =  await assignmentService.get(id)
        setResponse(assignment, res)
    }
    catch(err){
        setError(err,res)
    }
}

export const del = async (req,res)=>{
    let id = req.params.id
    let account = req.account
    
    console.log('assignment id to delete',id)

    try{
        let account_id = 1;
        let assignment  =  await assignmentService.del(id, account_id)
        setResponse(assignment, res)
    }
    catch(err){
        setError(err,res)
    }
}





export const l = async(req,res)=>{

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
