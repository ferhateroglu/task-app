const express = require('express');
require('./db/mongoose');//DB bağlantısı
const User = require('./models/users');
const Task = require('./models/task');

const app = express();

app.use(express.json());//post tan json almak için kullanılır

//get users
app.get('/users', async (req,res) =>{
    const users = await User.find({});
    try{
        res.status(200).send(users)
    }catch(e){
        res.status(500)
    }
});

//get users/:id //get request de body olmaz params. olur //console.log(req.params);// /users/123 sorgusunu döner //console.log(req.query);// /users/:id=1234 sorgusunu döner
app.get('/users/:id', async (req,res) =>{
    const { id }  = req.params;
    try{
        const user = await User.findById(id);
        if(user){
            res.status(200).send(user);
        }else{
            res.status(404).send();
        }
    }catch(e){
        res.status(500).send(e);
    }
});

// list all tasks
app.get('/tasks', async (req,res) =>{
    try{
        const t = await Task.find({});
        res.status(200).send(t);
    }catch(e){
        res.status(500).send(e);
    }
});

// list task
app.get('/tasks/:id', async (req,res) =>{
    const {id} = req.params;
    try{
        const t = await Task.findById(id);
        if(t){
            res.status(200).send(t);
        }else{
            res.status(400).send();
        }
    }catch(e){
        res.status(500).send(e);
    }
});

//get user

app.post('/tasks', async (req, res)=>{
    const task = new Task(req.body);
    try{
        const t = await user.save();
        res.send(t);
    }catch(e){
        res.send(e);
    }
});

app.post('/users', async (req,res) =>{
    const user = new User(req.body);
    try{
        const u = await user.save();
        res.status(201).send(u);
    }catch(e){
        res.status(400).send(e);
    }
});

app.listen(process.env.PORT || 3000, () =>{
    console.log('server aktif PORT: 3000');
});