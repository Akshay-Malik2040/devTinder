const express=require('express');
const {connectDB}=require("./config/database")
const app=express();
const cookieParser=require("cookie-parser")
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")

app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);

connectDB().then(()=>{
    console.log("DB is connected successfullly")
    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...")
})
}).catch(err=>{
    console.log("error");
})

