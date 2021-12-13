//.\mongod.exe --dbpath=/users/ferha/mongodb-data
//yukardaki komut ile mongodb manuel olarak açılır
//ardında mongodb.js dosyası node ile açılır
//objectid uniq identifyr biz atamazsak mongodb otomatik atar
const {MongoClient, ObjectID} = require('mongodb');

const connectionUrl = 'mongodb://localhost:27017';
const dbName = 'task-app';

MongoClient.connect(connectionUrl,{useNewUrlParser: true}, (error, client) =>{
    if(error){
        return console.log('bağlantı hatası oluştu');
    }
    const db = client.db(dbName);


});