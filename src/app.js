const express = require('express');
const { connectDB } = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const { requestRouter } = require("./routes/request")
const { userRouter } = require("./routes/user")
const http=require('http');
const cors= require("cors");
const initializeSocket = require('./utils/socket');
require("dotenv").config();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter)
app.use('/', userRouter)

const server=http.createServer(app);
initializeSocket(server);

connectDB().then(() => {
    console.log("DB is connected successfullly")
    server.listen(3000, () => {
        console.log("Server is successfully listening on port 3000...")
    })
}).catch(err => {
    console.log("Error" + err.message);
})

