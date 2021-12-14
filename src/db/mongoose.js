const mongoose = require('mongoose');
const CONNETCTION_URL = 'mongodb://localhost:27017/task';


mongoose.connect(CONNETCTION_URL,{
    useNewUrlParser: true,

});

/*const User = mongoose.model('users',{
    name:{
        type: String
    },
    lastname:{
        type: String
    },
    age:{
        type:Number
    }
});*/

/*const burak = new User({
    name:'Burak',
    lastname: 'alparslan',
    age: 33
});*/

const Tasks = mongoose.model('tasks',{
    describtion:{
        type: String
    },
    done:{
        type: Boolean
    }
});

const task1 = new Tasks({
    describtion: 'node js çalış',
    done: true
});
const task2 = new Tasks({
    describtion:'mongodb çalış',
    done: false
});

task1.save().then((t) => console.log(t)).catch((e) => console.log(e));
task2.save().then((t) => console.log(t)).catch((e) => console.log(e));