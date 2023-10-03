import Account from '../../models/Account.js'

const secretKey  ="abc"

export const verifyToken= async(req, res, next)=> {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }  

    let [email, password] = token.split(' ')

    console.log('token2----------',email,password)


    let account = await Account.findOne({
        where: {
            email: email,
            password: password
        }
    });


    if (!account) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = account.dataValues
  
    next();
}