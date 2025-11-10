const mongoose=require("mongoose");
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" Invalid email Address "+value)
            }
        }
        
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Choose a strong password")
            }
        }
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

userSchema.methods.getJWT=async function(){
    const user=this;
    const token = await jwt.sign({_id:user._id},"Dev@Tinder$790")
    return token
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,user.password)
    return isPasswordValid;
}


const User=mongoose.model("User",userSchema);

module.exports=User;