const express = require("express")
const app=express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
app.use(cors());



const io = require('socket.io')(3002,{
    cors:{
        origin:['http://localhost:3000'],
        methods: ["GET", "POST"]
    },
})


io.on("connection",(socket)=>{
    console.log("New connection made: "+socket.id);
    
    socket.on('newmsg',(msg)=>{
        console.log(msg);
        socket.broadcast.emit("receivemsg",msg);
    })
       
})






const msgs = ["msgs array"];

app.get("/msgs",(req,res)=>{
    res.json(msgs)
})

app.post("/msgs",(req,res)=>{
    newmsgs = [...msgs,"new mesage"]
    res.json(newmsgs)
})

server.listen(3001,()=>{
    console.log("Running...")
})