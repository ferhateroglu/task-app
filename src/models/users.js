const mongoose = require('mongoose');
const validator = require ('validator');
const { default: isEmail } = require('validator/lib/isEmail');

const User = mongoose.model('Users',{
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email:{
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('e-mail standratlarına uymuyor');
            }
        }
    },
    age:{
        type: Number,
        validate(value) {
            if(value < 0){
                throw new Error('yaş 0 dan küçük olamaz');
            }
        }
    }
});

module.exports = User;