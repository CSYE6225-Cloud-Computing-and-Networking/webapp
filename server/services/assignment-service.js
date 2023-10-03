import Assignment from "../models/Assignment.js";
import assignmentSchema from "./validations/assignment-validation.js";
import AccountAssignmentMap from "../models/Account-Assignment-Map.js";

export const save = async (assignment, account_id)=>{

    let account_created = Date.now()
    let account_updated = Date.now()

    try{

        const validationResult = assignmentSchema.validate(assignment);

        if (validationResult.error) {
            console.log(validationResult.error.details);
            return {"message":"Validations"}
          } else {
            console.log('Data is valid:', validationResult.value);
          }

        const new_assignment = await Assignment.create({
            id: account_updated,
            name: assignment.name,
            points: assignment.points,
            num_of_attemps: assignment.num_of_attemps,
            deadline: assignment.deadline,
            assignment_created: account_created,
            assignment_updated: account_updated
          });

          
          const acc_assign_map = await await AccountAssignmentMap.create({
            account: account_id,
            assignment: new_assignment.id
          });
        
        return {"message":"Created"}
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
        
        if (assignment === null) {
            return {"message":"No Assignment found"}
        }

        const assignment_account_id = await AccountAssignmentMap.findOne({ where: { assignment: id } })

        console.log('assignemnt acc map', assignment_account_id)


        // if(id!==userId){
        //     return {"message":"Forbidden", "status":403}
        // }


        await Assignment.destroy({
            where: {
              id: id
            }
        });

        return {"message":"Assignment deleted", "status":200}
    }
    catch(err){
        console.log('Error while removing data',err)
    }

}
