const mongoose = require('mongoose');

const Task = mongoose.model('tasks',{
    description:{
        type: String,
        required: true,
        minlength: 6
    },
    done:{
        type: Boolean,
        required: true
    }
});

module.exports = Task;