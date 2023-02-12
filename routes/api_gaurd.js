const jwt = require('jsonwebtoken');

module.exports = function auth(req){

    const token = req.header('Authorization').split(' ');
    //if(!token) return resizeBy.status(401).send('Unauthorized access');

    try{
        console.log('inside verify method');
        console.log(token);
        const verified = jwt.verify(token[1],process.env.TOKEN_SECRET);
        console.log('verified',verified);
        req.user = verified;
        return verified;
    } catch(err){
        return false;
    }
}