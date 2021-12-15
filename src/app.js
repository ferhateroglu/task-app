const express = require('express');
require('./db/mongoose');//DB bağlantısı
const User = require('./models/users');
const Task = require('./models/task');

const app = express();

app.use(express.json());//post tan json almak için kullanılır

//get users
app.get('/users',(req,res) =>{
    User.find({}).then(users => res.status(200).send(users)).catch(e => res.status(500)); 
});

//get users/:id //get request de body olmaz params. olur
app.get('/users/:id',(req,res) =>{
    //console.log(req.params);// /users/123 sorgusunu döner
    //console.log(req.query);// /users/:id=1234 sorgusunu döner
    const { id }  = req.params;

    User.findById(id)
    .then(user => {
        if(user){
            res.status(200).send(user);
        }else{
            res.status(400).send();
        }
    })
    .catch(e => res.status(500).send(e));
    
});

// list all tasks
app.get('/tasks',(req,res) =>{
    Task.find({}).then(t =>res.status(200).send(t)).catch(e => res.status(500).send(e));    
});

// find task

app.get('/tasks/:id',(req,res) =>{
    const {id} = req.params;
    Task.findById(id).then(t =>{
        if(t){
            res.status(200).send(t);
        }else{
            res.status(400).send();
        }
    }).catch(e => res.status(500).send(e));
});

//get user

app.post('/tasks',(req, res)=>{
    const task = new Task(req.body);
    task.save().then(t =>{res.send(t);}).catch(e => {res.send(e);});
});

app.post('/users',(req,res) =>{
    const user = new User(req.body);
    user.save().then((u) =>{res.status(201).send(u);}).catch((e) =>{res.status(400).send(e);});
});

app.listen(process.env.PORT || 3000, () =>{
    console.log('server aktif PORT: 3000');
});