//lib
const express = require("express");
const app = new express();
const server = require("http").createServer(app);
const io = require('socket.io')(server); 

//configurando o view engine
app.set('view engine', 'ejs');

const BD = [];

app.get('/', (req,res)=>{
    res.render("home",{
        db: BD
    })
})

io.on('connection',socket=>{

    console.log(`socket rodando id: ${socket.id} `)

    socket.on("msg",data=>{
        BD.push(data.msg)
        console.log(data.msg)
        socket.broadcast.emit("new",data)
    })

})

// rodando servidor
server.listen(4444, () => {
    console.log(`servidor rodando `)
})