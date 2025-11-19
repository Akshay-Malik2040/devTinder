const express = require("express");
const { ConnectionRequest } = require("../models/connectionRequest");
const User=require("../models/user")
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const USER_SAFE_DATA="firstName lastName photoURL age gender about skills"


userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"]);

        res.json({messgae:"Connection Request for review are",
            connectionRequest
        })
    }catch(err){
        res.status(400).json({Error: err.message});
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[{
                toUserId:loggedInUser._id,status:"accepted"
            },{
                fromUserId:loggedInUser._id,status:"accepted"
            }
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()==loggedInUser._id.toString()){ return row.toUserId}
            else return row.fromUserId;
        })
        res.json({data});
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const page=parseInt(req.query.page) ||1;
        const limit=parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed=new Set();
        connectionRequest.forEach(req=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString())
        })

        const users=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.json({users});
    } catch(err){
        res.status(400).json({Error : err.message})
    }
})

module.exports={userRouter}