const express = require('express');
require('./db/mongoose');
const User = require('./models/users');

const app = express();

app.use(express.json());//post tan json almak için kullanılır

app.post('/users',(req,res) =>{
    const user = new User(req.body);
    user.save().then((u) =>{
        res.send(u);
    }).catch((e) =>{
        res.send(e);
    });
});

app.listen(process.env.PORT || 3000, () =>{
    console.log('server aktif PORT: 3000');
});