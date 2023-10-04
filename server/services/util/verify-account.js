import Account from '../../models/Account.js'
import bcrypt from "bcrypt";

export const verifyToken= async(req, res, next)=> {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }  

    let bufferObj = Buffer.from(token, "base64");
  
    // Encode the Buffer as a utf8 string
    let decodedString = bufferObj.toString("utf8");
    
    console.log("The decoded string:", decodedString);

    let [email, password] = decodedString.split(' ')

    // console.log('token2----------',email,password)

    let account = await Account.findOne({
        where: {
            email: email,
        }
    });

    if (!account) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    let passwordMatch = await bcrypt.compare(password, account.dataValues.password);

    if(!passwordMatch){
        console.log('Password incorrect')
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.account = account.dataValues

    next();
}