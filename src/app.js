const express=require('express');
const app=express();

app.use("/server",(req,res)=>{
    res.send("Hello from server")
})

app.use("/hello",(req,res)=>{
    res.send("Hello hello hello")
})

app.use('/test',(req,res)=>{
    res.send("just testing routes")
})

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...")
})