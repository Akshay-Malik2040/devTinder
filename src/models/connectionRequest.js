const mongoose = require("mongoose");

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    status:{
        type:String,
        require:true,
        values:["ignore","interested","accepted","rejected"],
        message:'{VALUE} is incorrect status Type',
    }
},{timestamps:true});

const ConnectionRequest=new mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports={ConnectionRequest};