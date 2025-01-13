const mongoose=require('mongoose');

// const mongodb_URL='mongodb://localhost:27017/restaurants';
require("dotenv").config();  //jo bhi env file ke under define kiya hai voh process obj ke ander ayega

const connectDB=function(){
    mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{
            console.log("Connected to MongoDB");
        })

        .catch((err)=>{
            console.error("Issue in MongoDB connection");
            process.exit(1);
        })
}

const db=mongoose.connection;

db.on('disconnect',function(){
    console.log("MongoDB disconnected");
})

module.exports=connectDB;