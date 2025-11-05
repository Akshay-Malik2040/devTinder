const express=require('express');
const {connectDB}=require("./config/database")
const app=express();
const User=require("./models/user")

app.post("/signup",async(req,res)=>{
    const user=new User({
        firstName:"Abhishek",
        lastName: "Yadav",
        emailId:"abhi@gmail.com",
        password:"abhi@123",
    })

    await user.save();
    res.send("user created")
})

connectDB().then(()=>{
    console.log("DB is connected successfullly")
    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...")
})
}).catch(err=>{
    console.log("error");
})

