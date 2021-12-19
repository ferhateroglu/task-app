const express = require('express');
require('./db/mongoose');//DB bağlantısı
const routerUser = require('./router/user');
const routerTask = require('./router/task');

const app = express();

/*app.use((req,res) =>{
    console.log(req.method,req.url);
    if(req.method === 'GET'){
        next();
    }else{
        res.status(500).send('şu an sadece get istekleri kullanabilirsiniz.');
    }
});*/

app.use(express.json());//post tan json almak için kullanılır
app.use(routerUser);
app.use(routerTask);

app.listen(process.env.PORT || 3000, () =>{
    console.log('server aktif PORT: 3000');
});
