const {MongoClient} = require('mongodb');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

let db;
async function connectDB(){
    try{
        await client.connect();
        db = client.db('todoApp');
        console.log('data base connected!!!');  
    }catch(err){
        console.log('error connecting db',err);
    }  
}

function getDB(){
    return db;
}

module.exports = {connectDB,getDB};    