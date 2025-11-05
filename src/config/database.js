const mongoose=require("mongoose");

const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://Akshay_Malik:PVOR%40Y8J9%23akshay@cluster0.ip2vubf.mongodb.net/devTinder")
}

module.exports={
    connectDB
}