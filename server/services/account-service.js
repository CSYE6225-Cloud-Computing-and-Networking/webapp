import Assignment from "../models/Assignment.js";

export const save = async (assignment)=>{

    let account_created = Date.now()
    let account_updated = Date.now()

    try{

        // const new_assignment = await Assignment.create({
        //     id: account_updated,
        //     name: assignment.name,
        //     points: assignment.points,
        //     num_of_attemps: assignment.num_of_attemps,
        //     deadline: assignment.deadline,
        //     assignment_created: account_created,
        //     assignment_updated: account_updated
        //   });
        
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
