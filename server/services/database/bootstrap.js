import { sequelize } from "./db.js";
import bcrypt from "bcrypt";
import Assignment from "../../models/Assignment.js";
import Account from "../../models/Account.js";
import AccountAssignmentMap from "../../models/Account-Assignment-Map.js";
import * as fs from "fs";
import csv from 'csv-parser';

const filePath = '../../webapp/config/users.csv';


sequelize.sync()
let users = []

export let user_details= async()=>
{
	try{
		fs.createReadStream(filePath).pipe(csv()).on('data', async(data) => {
			users.push(data);
			await user_add(data)
	  })
	  .on('end', () => {
		// console.log(users);
	  })
	  .on('error', (error) => {
		console.error('Error while parsing CSV:', error);
	  });
	}
	catch(err){
		console.log("start up error")
	}
	
 
}

export let user_add = async(user)=>{
  const account_exists = await Account.findOne({ where: { email: user.email } });
  let account_created = new Date()
  let account_updated = new Date()
  
  if(account_exists){
	console.log('account exsists ')
  }
  else{


	bcrypt.hash(user.password, 7, async(err, hash) =>{
		if(err){
			return {"message":"error while saving user details","status":400}
		}

		const new_count = await Account.create({
			id: Date.now(),
			first_name: user.first_name,
			last_name: user.last_name,
			password: hash,
			email: user.email,
			assignment_created: account_created.toISOString(),
			assignment_updated: account_updated.toISOString()
		  });
		  console.log('new account created')
	}); 
  }
}

// try{
// 	// user_add()
// 	user_details()

// }
// catch(err){
// 	console.log('error in bootstrap')
// }

