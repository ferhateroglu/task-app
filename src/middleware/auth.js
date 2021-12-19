const jwt = require('jsonwebtoken');
const User = require('../models/users');
const auth = async (req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decodedToken = await jwt.verify(token, 'privatekey');
        const user = await User.findOne({_id: decodedToken.id, 'tokens.token': token});
    
        if(!user){
            throw new Error();
        }
        req.user = user;
        next();

    }catch(e){
        res.send(401).send('lütfen giriş yapınız');
    }
}

module.exports = auth;