const express=require('express');
const {adminAuth,userAuth}=require('./middlewares/auth.js');
const app=express();

app.use("/admin",adminAuth)

app.get("/user/login",(req,res)=>{
    res.send("user login process started");
})
app.get("/user/getAllData",userAuth,(req,res,next)=>{
    res.send("User data send");
})


app.get("/admin/getAllData",(req,res,next)=>{
    res.send("All data Send");
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("deleted the user");
})

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...")
})