const express=require('express');
const {connectDB}=require("./config/database")
const app=express();
const User=require("./models/user")
const {validateSignUpData} = require("../src/utils/validation")
const bcrypt=require("bcrypt")

app.use(express.json());

app.post("/signup",async(req,res)=>{
    //validation
    try{
        validateSignUpData(req);
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);

        const user=new User({
            firstName,lastName,emailId,
            password:passwordHash
        })

        await user.save();
        res.send("user created")
    } catch(err){
        res.send("Error : "+err);
    }
})





app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.find({emailId:userEmail}).exec();
        if(users.length===0){
            res.status(404).send("User Not Found");
        }
        res.send(users);
    } catch(err){
        res.status(404).send("Something Went Wrong!!"+err);
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find();
        res.send(users);
    } catch (err){
        res.send(err);
    }
})

app.delete("/user",async(req,res)=>{
        const userId=req.body.userId
        try{
            const user=await User.findByIdAndDelete(userId);
            res.send("User deleted Successfully");
        } catch(err){
            res.send(err)
        }
})

app.patch("/user",async (req,res)=>{
    const userId=req.body.userId;
    try{
        const data=req.body;
        const allowed_updates=["photoUrl","about","gender","age","skills","emailId","lastName","userId"]
        const isUpdateAllowed=Object.keys(data).every((k)=>(
            allowed_updates.includes(k)
        ));
        if(!isUpdateAllowed){
            throw new Error("Update Not Allowed")
        }

        const user=await User.findByIdAndUpdate(userId,data,{runValidators:true});
        res.send("User updated successfully")
    }catch(err){
        res.send("something wrong happens"+err)
    }
})


connectDB().then(()=>{
    console.log("DB is connected successfullly")
    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...")
})
}).catch(err=>{
    console.log("error");
})

