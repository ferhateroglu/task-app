const express = require('express');
const User = require('../models/users');
const auth = require('../middleware/auth');
const router = express.Router();

//list all users 
router.get('/users', auth, async (req,res) =>{
    const users = await User.find({});
    try{
        res.status(200).send(users)
    }catch(e){
        res.status(500)
    }
});

// list user //get request de body olmaz params. olur //console.log(req.params);// /users/123 sorgusunu döner //console.log(req.query);// /users/:id=1234 sorgusunu döner
router.get('/users/me', auth, async (req,res) =>{
    res.send(req.user);
});

//save user
router.post('/users', async (req,res) =>{ 
    const user = new User(req.body);
    try{
        const u = await user.save();
        const token = await user.createToken();
        res.status(201).send({user: u,token: token});
    }catch(e){
        res.status(400).send(e);
    }
});

//login
router.post('/users/login', async (req,res) =>{
    try{
        const { email, password} = req.body;
        const user = await User.login(email,password);

        //token
        const token = await user.createToken();

        res.status(200).send({user, token});
    }catch(e){
        res.status(400).send(e);
    }
});

//update user
router.put('/users/:id', async (req,res) =>{

    const allowedUpdates = ['name', 'password', 'email'];
    const keys = Object.keys(req.body);//body içerisindeki keyleri alır
    // keys = ["name","age",password]
    const isvalid = keys.every(x => allowedUpdates.includes(x));
    if(!isvalid) {
        return res.status(400).send('istek geçersiz');
    }
        //const user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators: true});
    try{
        const {id} = req.params;
        //const user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators: true});
        const user = await User.findById(id);

        keys.forEach(key => user[key] = req.body[key]);
        const newUser = await user.save(); 
        if(newUser){
            res.status(200).send(newUser);
        }else{
            res.status(404).send();
        }
    }catch(e){
        res.status(500).send(e);
    }
});

//user delete
router.delete('/users/:id', async (req,res) =>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(user){
            res.status(200).send(user);
        }else{
            res.status(404).send();
        }
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;