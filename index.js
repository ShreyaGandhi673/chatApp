//node server which will handle socket io connection
const io=require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});
const users={};
io.on('connection',socket=>{//socket connection ko listen krega
    socket.on('new-user-joined',name=>{    //perticular connection ke sath kya hhoga
        console.log("new user",name);
        users[socket.id]=name;             //socket.id me name dal do
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',message=>{ //agar send kiya kisine msg to bakiyo ko receive krvado
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
        //agarmsg aya to broadcast krdo sabko pahucha do
        
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.io];
    })
})

