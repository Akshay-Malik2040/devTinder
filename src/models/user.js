const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:2

    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        
    },
    phone:{
        type:Number,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    skills:{
        type:[String],
    },
    about:{
        type:String,
        default:"This is a default about"
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema);

module.exports=User;