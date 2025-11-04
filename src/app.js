const express=require('express');
const app=express();

// app.get("/ab*cd",(req,res)=>{
//     const id=req.params;
//     console.log(id);
//     res.send({firstName:"Akshay",secondName:"Malik"});
// })

app.use("/user",(req,res,next)=>{
    // res.send("user");
    console.log("response")
    // res.send("user");
    next();
    // res.send("user");
},[(req,res,next)=>{
    // res.send("user");
    console.log("response 2")
    // res.send("user");
    next();
    // res.send("user");
},

(req,res,next)=>{
    // res.send("user");
    console.log("response 3")
    // res.send("user");
    next();
    // res.send("user");
}],

(req,res,next)=>{
    // res.send("user");
    console.log("response 4")
    // res.send("user");
    next();
    // res.send("user");
},

(req,res,next)=>{
    // res.send("user");
    console.log("response 5")
    // res.send("user");
    next();
    res.send("user");
}

)


app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...")
})