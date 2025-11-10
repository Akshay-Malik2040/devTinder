const express=require('express');
const {connectDB}=require("./config/database")
const app=express();
const User=require("./models/user")
const {validateSignUpData} = require("../src/utils/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

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

app.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid=await user.validatePassword(password);
        if(!isPasswordValid){
            throw new Error("Invalid Credentials");
        }

        const token=await user.getJWT();

        res.cookie("token",token);
        res.send("Login Successfully");

    }catch(err){
        res.send({error :err.message});
    }

})


app.get("/profile",userAuth,async (req,res)=>{
    try{
        const cookies=req.cookies;
        const {token}=cookies;
        const decodedMessage=await jwt.verify(token,"Dev@Tinder$790")
        const {_id}=decodedMessage;
        const loggedInUser=await User.find({_id});
        res.send(loggedInUser)
    } catch(err){
        res.status(400).send({error : err.message});
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

