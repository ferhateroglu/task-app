const express = require('express');
const Task = require('../models/tasks');
const router = express.Router();

// list all tasks
router.get('/tasks', async (req,res) =>{
    try{
        const t = await Task.find({});
        res.status(200).send(t);
    }catch(e){
        res.status(500).send(e);
    }
});

// list task
router.get('/tasks/:id', async (req,res) =>{
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
router.post('/tasks', async (req, res)=>{
    const task = new Task(req.body);
    try{
        const t = await task.save();
        res.send(t);
    }catch(e){
        res.send(e);
    }
});

//task update
router.put('/tasks/:id', async(req,res) =>{
    try{
        const {id} = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {new: true,runValidators: true});
        if(updatedTask){
            res.status(200).send(updatedTask);
        }else{
            res.status(404).send();
        }
    }catch(e){
        res.status(500).send(e);
    }
});

//task delete
router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;
