const router  = require('express').Router();
const joi = require('joi');
const User = require('../model/User');
const {registerValidation, loginValidation} = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./api_gaurd');

const users = [];

router.post('./register',async(req, res)=>{
    //validate input data
    const {error}  = registerValidation(r(eq.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking for duplicate user
    //const emailExist = await User.findOne({email: req.body.email});
    //if(emailExist) return res.status(400).send('email already exists');

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    // try{
    //     const savedUser = await user.save();
    //     res.send(savedUser);
    // } catch(err){
    //     res.status(400).send(err);
    // }

    users.push({user: user, password: hashedPassword});
    res.status(201).send(users);


});

router.post('/login',async (req,res) =>{
        //validate input data
        console.log(users);
        const {error}  = loginValidation(r(eq.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = users.find((c)=> c.user.email == req.body.email);
        if(!user) return res.status(400).send(JSON.stringify('Invalid username or password'));
        console.log(user);

        //checking if email exist
        //const emailExist = await User.findOne({email: req.body.email});
        //if(emailExist) return res.status(400).send('Invalid username or password');

        //checking for password
        //const validPass = await bcrypt.compare(req.body.password, user.password);
        //if(!validPass) return res.status(400).send('Invalid username or password');

        //issuing jwt
        const token = jwt.sign({_id:user._id,expires_in:3600},process.env.TOKEN_SECRET);
        const refreshToken = jwt.sign({email:user.email},'refreshSecret');
        console.log(token);
        //res.header('auth-token',token).send(token);
        res.send(JSON.stringify({authToken:token,expires_in:3600,refreshToken:refreshToken}));
        //res.send('logged in');
});

router.post('/verifyToken',(req,res)=>{
    console.log('in verifyToken');
    res.send(verify(req));
});

router.post('/refreshToken',(req,res)=>{
    const {email,refreshToken} = req.body;
    try{
        const decoded = jwt.verify(refreshToken, 'refreshSecret');
        if(decoded.email === email){
            const token = jwt.sign({_id:user._id,expires_in:3600},process.env.TOKEN_SECRET);
            const refreshToken = jwt.sign({email:user.email},'refreshSecret');
            res.send(JSON.stringify({authToken:token,expires_in:3600,refreshToken:refreshToken}));
        }
    } catch(error){
        return false;
    }
});

module.exports = router;

