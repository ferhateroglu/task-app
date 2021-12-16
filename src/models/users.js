const mongoose = require('mongoose');
const validator = require ('validator');
const bcyrpt = require('bcrypt');

const userSchema = mongoose.Schema({
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

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcyrpt.hash(user.password,8);
    }
    console.log(user);
    next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;