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
        lowercase: true,
        trim: true,
        unique: true,
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

//login
userSchema.statics.login = async (email, password) =>{
    
    const user = await User.findOne({email});
    if(!user){
        throw new Error('login başarısız');
    }

    const isMatch = await bcyrpt.compare(password, user.password);

    if(!isMatch) {
        throw new  Error('Login başarısız');
    }
    return user;
}

//save() fonksiyonu çağıırlınca burası çalışır
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcyrpt.hash(user.password,8);
    }
    next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;