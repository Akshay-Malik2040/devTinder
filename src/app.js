const express=require('express');
const app=express();

app.get("/user",(req,res)=>{
    res.send({firstName:"Akshay",secondName:"Malik"});
})

app.post("/user",(req,res)=>{
    console.log("save data to db");
    res.send("data successfully saved");
})

app.put("/user",(req,res)=>{
    res.send("data updated successfully using put");
})

app.patch("/user",(req,res)=>{
    res.send("data successfully updated using patch");
})

app.delete("/user",(req,res)=>{
    res.send("data is deleted successfully");
})

// app.use("/server",(req,res)=>{
//     res.send("Hello from server")
// })

// app.use("/hello",(req,res)=>{
//     res.send("Hello hello hello")
// })

// app.use('/test',(req,res)=>{
//     res.send("just testing routes")
// })

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000...")
})