const express = require('express');
const router = express.Router();
const {getDB} = require('../db');
const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;

router.post('/signup',async(req,res)=>{
    const database = getDB();
    const {name,email,password} = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({message:'All fields required!!!'});
    }

    const existingUser = await database.collection('users').findOne({email});
    if(existingUser){
        return res.status(409).json({message:'Email already Registerd'});
    }

    const result = await database.collection('users').insertOne({name,email,password});

    res.status(200).json({
        databaseId:result.insertedId,
        name:name,
        email:email,
        password:password,
        message:'data reach at backend'
    });
});

router.post('/signin',async(req,res)=>{
    const database = getDB();
    const {email,password} = req.body;
    
    const user = await database.collection('users').findOne({email});
    // console.log(user);
    if(!user){
        return res.status(404).json({message:'user not found'});
    }

    if(user.password != password){
        return res.status(404).json({message:'Invalid password'});
    }
    const token = jwt.sign({userId:user._id,email:user.email},key,{expiresIn:'24h'});
    res.status(200).json({
        token:token,
        message:'user loged in from server!!!',
    });

});
module.exports = router;