const express = require('express');
const router = express.Router();
const {getDB} = require('../db');

const verfiyToken = require('../midleware/authMidleware');
const { ObjectId } = require('mongodb');

//to check is token valid or not during login 
router.post('/home',verfiyToken,async(req,res)=>{   
    res.status(200).json({message:'welcome'});
});
router.post('/addtodo',verfiyToken,async(req,res)=>{
    const database = getDB();
    const {title,task,completed} = req.body;

    
    console.log('data',{title,task});
    
    if(!title || !task){
        return res.status(400).json({message:'Title and task required!!!'});
    }
    const userId = {
        userIdRf : req.user.userId
    }

    const existingTask = await database.collection('todos').findOne({title});

    if(existingTask){
        return res.status(409).json({message:'The todo alredy exist'});
    }

    const data = {
        userIdRef : userId.userIdRf,
        title : title,
        task : task,
        completed : completed
    }
    console.log(data);

    await database.collection('todos').insertOne(data);
    res.status(200).json({message:'Todo stored at Database'});
});

router.get('/todos',verfiyToken,async(req,res)=>{
    const database = getDB();
    const {userId} = req.user; //object destructuring
    const {filter} = req.query;
    // console.log(filter)
    try{    
    // console.log('userID',userId);
    
    if(filter == "all"){
        const todos = await database.collection('todos').find({userIdRef:userId}).toArray();

        if(todos.length == 0){
            return res.json({
                todos: [],
                message: "No pending todos"
            });
        }
        res.json({todos});
    }

    if(filter == 'pending'){
        const todos = await database.collection('todos').find({userIdRef:userId,completed:false}).toArray();
        
        if(todos.length == 0){
            return res.json({
                todos: [],
                message: "No pending todos"
            });
        }
        res.json({todos});
    }

    if(filter == 'completed'){
        const todos = await database.collection('todos').find({userIdRef:userId,completed:true}).toArray();

        if(todos.length == 0){
            return res.json({
                todos: [],
                message: "No pending todos"
            });
        }

        // console.log({todos});
        
        res.json({todos});
    }
  
  
    // console.log(todos);
    }catch(err){
        return res.status(500).json({message:'internal server issue'});
    }
});

router.put('/todos/:taskId',verfiyToken,async(req,res)=>{
    const database = getDB();
    const { taskId } = req.params;
    const {userId} = req.user;
    const {title,task,completed} = req.body;

 

    try{
        //this is to mark task as done
        if(completed){
            const result = await database.collection('todos').updateOne(
                {_id:new ObjectId(taskId),userIdRef:userId},
                {$set:{completed}}
            )

            if(result.matchedCount == 0){
                return res.status(404).json({message:'Todo not found unautherized!!!'});
            }
            return res.status(200).json({message:'mark as done'});
        }

        //this is to update todo title + task
        if(!title || !task){
            return res.status(404).json({message:'Task and title required'});
         }
        const result = await database.collection('todos').updateOne(
            {_id:new ObjectId(taskId),userIdRef:userId},
            {$set:{title,task}}
        );

        if(result.matchedCount == 0){
            return res.status(404).json({message:'Todo not found unautherized'});
        }

        res.status(200).json({message:'Todo Updated!!!'});
        

    }catch(err){
        res.status(500).json({message:'internal server issue'});
    }
    
});

router.delete('/todo/:taskId',verfiyToken,async(req,res)=>{
    const database = getDB();
    const {taskId} = req.params;
    const {userId} = req.user;

    try{
        const result = await database.collection('todos').deleteOne({
            _id:new ObjectId(taskId),//task id
            userIdRef:userId //to inshure this user own this perticular todo
        });
        if(result.matchedCount == 0){
            return res.status(404).json({message:'Todo Not found'});
        }
        res.status(200).json({message:'Todo Deleted!!!'});
    }catch(err){
        res.status(500).json({message:'Internal server Issue'});
    }
});


module.exports = router;