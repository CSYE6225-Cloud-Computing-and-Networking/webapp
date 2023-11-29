import Assignment from "../models/Assignment.js";
import assignmentSchema from "./validations/assignment-validation.js";
import submissionSchema from "./validations/submission-validation.js";
import AccountAssignmentMap from "../models/Account-Assignment-Map.js";
import AssignmentSubmissiontMap from "../models/Assignment-Submission.js";
import { v4 as uuid } from 'uuid';
import Submission from "../models/Submission.js";
import { SNSClient, ListTopicsCommand, PublishCommand  } from "@aws-sdk/client-sns";
import dotenv from 'dotenv';

dotenv.config();

export const save = async (assignment, account_id)=>{
    
    let account_created = new Date();
    let account_updated = new Date();

    try{
        const validationResult = assignmentSchema.validate(assignment);

        if (validationResult.error) {
            console.log(validationResult.error.details);
            return {"message":"Validation Error, send valid request", "status":400}
        } 

        const new_assignment = await Assignment.create({
            id: uuid(),
            name: assignment.name,
            points: assignment.points,
            num_of_attemps: assignment.num_of_attemps,
            deadline: assignment.deadline,
            assignment_created: account_created.toISOString(),
            assignment_updated: account_updated.toISOString()
          });

          const acc_assign_map = await await AccountAssignmentMap.create({
            account: account_id,
            assignment: new_assignment.id
          });
        
        return new_assignment
    }
    catch(err){
        console.log('Error while saving data',err)
    }
}

export const list = async()=>{
    try{
        const assignments = await Assignment.findAll();      
        return assignments
    }
    catch(err){
        console.log('Error while retreiving data',err)
    }
}

export const get = async(id)=>{
    try{

        const assignment = await Assignment.findOne({ where: { id: id } });
        
        if(!assignment){
            return {"message":"No Assignment found", "status":404}
        }

        return {
            "id":assignment.dataValues.id,
            "name": assignment.dataValues.name, 
            "points": assignment.dataValues.points, 
            "num_of_attemps": assignment.dataValues.num_of_attemps,
            "deadline": assignment.dataValues.deadline, 
            "assignment_created": assignment.dataValues.assignment_created,
            "assignment_updated": assignment.dataValues.assignment_updated,
        }
    }
    catch(err){
        console.log('Error while retreiving data',err)
    }
}

export const del = async(id, account_id)=>{

    try{
        const assignment = await Assignment.findByPk(id);
        
        if (!assignment) {
            return {"message":"No Assignment found","status":404}
        }

        const acc_assign_map = await AccountAssignmentMap.findOne({ where: { assignment: id } })

        if(account_id!==acc_assign_map.dataValues.account){
            return {"message":"Forbidden", "status":403}
        }

        await Assignment.destroy({
            where: {
              id: id
            }
        });

        await AccountAssignmentMap.destroy({
            where: {
              id: acc_assign_map.dataValues.id
            }
        });

        return {"message":"Assignment deleted", "status":200}
    }
    catch(err){
        console.log('Error while removing data',err)
    }
}

export const update = async(id, account_id, req)=>{

    try{
        const validationResult = assignmentSchema.validate(req);

        if (validationResult.error) {
            console.log(validationResult.error.details);
            return {"message":"Validation Error, send valid request", "status":400}
        } 

        const assignment = await Assignment.findByPk(id);
        
        if (!assignment) {
            return {"message":"No Assignment found","status":404}
        }

        const acc_assign_map = await AccountAssignmentMap.findOne({ where: { assignment: id } })

        if(account_id!==acc_assign_map.dataValues.account){
            return {"message":"Forbidden", "status":403}
        }

        let account_updated = new Date();
        const updated_assignment = await Assignment.update(
            {
                name: req.name,
                points: req.points,
                num_of_attemps: req.num_of_attemps,
                deadline: req.deadline,
                assignment_updated: account_updated.toISOString()
            },
            {
              where: { id: assignment.id },
            }
        );

        return {"message":"Assignment updated", "status":200}
    }
    catch(err){
        console.log('Error while updating data',err)
    }
}

export const submission = async(id, account_id, req, account)=>{

    try{
        let time = new Date()
        const validationResult = submissionSchema.validate(req)

        if (validationResult.error) {
            console.log(validationResult.error.details);
            return {"message":"Validation Error, send valid request", "status":400}
        } 

        const assignment = await Assignment.findByPk(id);
        
        if (!assignment) {
            return {"message":"No Assignment found","status":404}
        }

        let deadline = assignment.dataValues.deadline
        let retry_attempts = assignment.dataValues.num_of_attemps

        let submission_time = new Date();

        let submission_attempt = await AssignmentSubmissiontMap.count({
            where: {
              account: account_id,
              assignment:  id
            },
        });

        console.log('submission attempt',submission_attempt)

        console.log('submission time',submission_time)
        console.log('deadline', new Date(deadline))

        if(submission_time > new Date(deadline)){
            console.log('deadline exceeded')
            return {"message":"deadline exceeded", "status":400}
        }

        if(submission_attempt >= retry_attempts){
            console.log('attempt exceeded')
            return {"message":"attempt exceeded", "status":400}
        }

        const new_submission = await Submission.create({
            id: uuid(),
            assignment_id: id,
            submission_url: req.submission_url,
            submission_date: time.toISOString(),
            submission_updated: time.toISOString(),
        });

        // console.log('new sub ', new_submission)

        const assign_sub_map = await AssignmentSubmissiontMap.create({
            account: account_id,
            assignment: id,
            submission: new_submission.id
        });

        // console.log('sub assign map',assign_sub_map)

        //send sns noti

        let reg = process.env.reg || "us-east-1"
        const snsClient  = new SNSClient({ region: reg});

        const snsTopic = process.env.snsTopic || "arn:aws:sns:us-east-1:995720948536:testTopic"

        const publish = async (
            message = "Hello from SNS!",
            topicArn = snsTopic,
          ) => {
            const response = await snsClient.send(
              new PublishCommand({
                Message: message,
                TopicArn: topicArn,
              }),
            );
            // console.log(response);

            return response;
          };

          let pubMsg = req.submission_url+','+account.email
          publish(pubMsg)

        return {"message":"Assignment submitted", "status":200}
    }
    catch(err){
        console.log('Error while submitting assignment',err)
    }
}