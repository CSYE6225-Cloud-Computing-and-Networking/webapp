import Account from '../../models/Account.js'
import bcrypt from "bcrypt";

export const verifyToken= async(req, res, next)=> {
    let token_raw = req.headers['authorization']

    if (!token_raw) {
        return res.status(401).json({ message: 'No token provided' });
    }  

    let token_split = token_raw.split(' ')
    const token = token_split[1]

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }  

    let bufferObj = Buffer.from(token, "base64");

    let decodedString = bufferObj.toString("utf8");

    let [email, password] = decodedString.split(':')

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