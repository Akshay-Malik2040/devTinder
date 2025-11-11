const express=require('express');
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const {validateEditProfileData}=require("../utils/validation")

profileRouter.get('/profile/edit',userAuth,async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error ("Invalid Edit Request");
        }

        const loggedInUser=req.user;
        Object.keys(req.body).every((key)=>loggedInUser[key]=req.body[key]);
        await loggedInUser.save();
        res.send("Updated Successful");
    } catch(err){
        res.status(400).send({error : err.message});
    }
})

module.exports=profileRouter;