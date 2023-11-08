//controller for assignment check
import { setError, setResponse } from "../services/util/response.js";
import { sequelize } from "../services/database/db.js";

import * as assignmentService from "../services/assignment-service.js"

export const create = async(req,res)=>{

    try{
        req.statsd.increment('assignment.route.create');
        let req_body = req.body 
        let account = req.account
        let savedAssignment = await assignmentService.save(req_body, account.id)
        setResponse(savedAssignment, res, 201)
    }
    catch(err){
        setError(err,res)
    }
}

export const list = async(req,res)=>{

    try{
        req.statsd.increment('assignment.route.list');
        let assignment_list = await assignmentService.list();
        setResponse(assignment_list, res)
    }
    catch(err){
        setError(err,res)
    }
}

export const get = async (req,res)=>{
    let id = req.params.id
    try{
        req.statsd.increment('assignment.route.get');
        let assignment  =  await assignmentService.get(id)
        setResponse(assignment, res, assignment.status)
    }
    catch(err){
        setError(err,res)
    }
}

export const del = async (req,res)=>{
    let id = req.params.id
    let account = req.account

    try{
        req.statsd.increment('assignment.route.del');
        let assignment  =  await assignmentService.del(id, account.id)
        setResponse(assignment, res, assignment.status)
    }
    catch(err){
        setError(err,res)
    }
}

export const update = async (req,res)=>{
    let req_body = req.body 
    let id = req.params.id
    let account = req.account

    try{
        req.statsd.increment('assignment.route.update');
        let assignment  =  await assignmentService.update(id, account.id, req_body)
        setResponse(assignment, res, assignment.status)
    }
    catch(err){
        setError(err,res)
    }
}
