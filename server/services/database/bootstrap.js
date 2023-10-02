import { sequelize } from "./db.js";
import bcrypt from "bcrypt";
import Assignment from "../../models/Assignment.js";
import Account from "../../models/Account.js";
import AccountAssignmentMap from "../../models/Account-Assignment-Map.js";

sequelize.sync()

let user = {
  "first_name":"Test",
  "last_name": "Demo",
  "password":"pass",
  "email":"email@.com"
}

let user_add = async()=>{
  const account_exists = await Account.findOne({ where: { email: user.email } });
  let account_created = Date.now()
  let account_updated = Date.now()
  
  if(account_exists){
	console.log('account exsists')
  }
  else{


	bcrypt.hash(user.password, 7, async(err, hash) =>{
		if(err){
			return {"message":"error while saving user details","status":400}
		}

		// await query(`insert into users (first_name, last_name, username, password, account_created, account_updated) 
		// values('${user.first_name}','${user.last_name}','${user.username}','${hash}','${account_created}','${account_updated}');`,'');
		const new_count = await Account.create({
			id: account_updated,
			first_name: user.first_name,
			last_name: user.last_name,
			password: hash,
			email: user.email,
			assignment_created: account_created,
			assignment_updated: account_updated
		  });
		  console.log('new account created')


	}); 
	
	
  }

}

try{
	user_add()
}
catch(err){
	console.log('error in bootstrap')
}

