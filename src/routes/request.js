const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest")
const User=require("../models/user")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Not a valid Status")
        }
        
        const existingConnectionRequest = await ConnectionRequest.findOne(
            {$or: [{
                fromUserId,toUserId
            }, {
                fromUserId:toUserId,toUserId:fromUserId
            }]})
            
            if(existingConnectionRequest){
                throw new Error ("connection request already exist!!");
            }
            console.log(toUserId)
            
            const toUser=await User.findById(toUserId).exec();
            if(!toUser){
                throw new Error("User not found")
            }
            console.log("start")

            if(toUserId.toString()===fromUserId.toString()){
                throw new Error("Cannot send req to Yourself")
            }
        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })
        const data = await connectionRequest.save();
        res.json({ message: "Connection Request Sent successfully", data });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})


requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const {status,requestId}=req.params;
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
          throw new Error("Status not allowed!!");
        }
        
        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })
        
        // console.log("debugging");

        if(!connectionRequest){
            res.status(404).json({message:"Connection request not found"});
        }

        connectionRequest.status=status;
        const data=await connectionRequest.save();
        res.json({message:"Connection Request accepted"});
    } catch(err){
        res.status(400).json({message: err.message});
    }
})


module.exports = { requestRouter }