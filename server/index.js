const express = require('express');
const cors = require('cors');
require('dotenv').config();
const logunSignUpRouter = require('./routes/Auth');
const todoRoutes = require('./routes/todo');
const {connectDB} = require('./db');

const app = express(); // the express is returing a object alredy we just store in variable and good to use 
const port = process.env.PORT || 3000;
app.use(cors());



app.use(express.json());
app.use('/api',logunSignUpRouter);
app.use('/api',todoRoutes);
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is runnig on port ${port}`)
    });
});
