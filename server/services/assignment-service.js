import Assignment from "../models/Assignment.js";
import assignmentSchema from "./validations/assignment-validation.js";
import AccountAssignmentMap from "../models/Account-Assignment-Map.js";

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
            id: Date.now(),
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
        
        return {"message":"New Assignment Created"}
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
            "name": assignment.dataValues.name, 
            "points": assignment.dataValues.points, 
            "num_of_attemps": assignment.dataValues.num_of_attemps,
            "deadline": assignment.dataValues.deadline, 
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
        console.log('assignemnt acc map', acc_assign_map)

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
        console.log('assignemnt acc map', acc_assign_map)

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
