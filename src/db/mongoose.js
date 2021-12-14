const mongoose = require('mongoose');
const CONNETCTION_URL = 'mongodb://localhost:27017/task';

mongoose.connect(CONNETCTION_URL,{
    useNewUrlParser: true,
});
