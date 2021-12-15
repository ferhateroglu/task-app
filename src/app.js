const express = require('express');
require('./db/mongoose');//DB bağlantısı
const User = require('./models/users');
const Task = require('./models/task');

const app = express();

app.use(express.json());//post tan json almak için kullanılır

//list users 
app.get('/users', async (req,res) =>{
    const users = await User.find({});
    try{
        res.status(200).send(users)
    }catch(e){
        res.status(500)
    }
});

// list user //get request de body olmaz params. olur //console.log(req.params);// /users/123 sorgusunu döner //console.log(req.query);// /users/:id=1234 sorgusunu döner
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

//task save
app.post('/tasks', async (req, res)=>{
    const task = new Task(req.body);
    try{
        const t = await task.save();
        res.send(t);
    }catch(e){
        res.send(e);
    }
});

//user save
app.post('/users', async (req,res) =>{
    const user = new User(req.body);
    try{
        const u = await user.save();
        res.status(201).send(u);
    }catch(e){
        res.status(400).send(e);
    }
});

//user update
app.put('/users/:id', async (req,res) =>{

    const allowedUpdates = ['name', 'password', 'email'];
    const keys = Object.keys(req.body);//body içerisindeki keyleri alır
    const isvalid = keys.every(x => allowedUpdates.includes(x));
    if(!isvalid) {
        return res.status(400).send('istek geçersiz');
    }

    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, {new:true, runValidators: true});
        if(user){
            res.status(200).send(user);
        }else{
            res.status(404).send();
        }
    }catch(e){
        res.status(500).send(e);
    }
});

//task update
app.put('/tasks/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {new: true,runValidators: true});
        if(updatedTask){
            req.status(200).send(updatedTask);
        }else{
            req.status(404).send();
        }
    }catch(e){
        res.status(500).send(e);
    }
});
//user delete
app.delete('/users/:id', async (req,res) =>{
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

//task delete
app.delete('/tasks/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        if(task){
            res.status(200).send(task);
        }else{
            res.status(404).send();
        }
    }catch(e){
        res.status(500).send(e);
    }
});

app.listen(process.env.PORT || 3000, () =>{
    console.log('server aktif PORT: 3000');
});
