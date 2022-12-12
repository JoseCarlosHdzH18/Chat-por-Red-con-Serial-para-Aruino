const path = require('path')
const express = require('express')
const app = express()
const SocketIO = require('socket.io')

var serial = false

app.use((express.static(path.join(__dirname,"public"))))
app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () =>{
    console.log("server port:", app.get("port"));
})
const io = SocketIO(server)

const { SerialPort, ReadlineParser  } = require('serialport');
const port = new SerialPort({
path: 'COM6',
baudRate: 9600,
dataBits: 8,
stopBits: 1,
parity: 'none',
});

//HOME
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
})
io.on('connection', (socket)=>{
    socket.on("message", (data)=>{
        socket.broadcast.emit("message", data)
        console.log(data.msg)
        if(serial){
            parser.on('data',ard_serial=> { 
                console.log("Respuesta Serial: ",ard_serial)
            })
            
            port.write(data.msg)
        }
    
    })
})





port.on('error', err => console.log("JC Error: "+err))

port.on('open', () => {
  console.log("conectado Serial")
  serial=true
})


// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    port.read().toString()
  })

  const parser = new ReadlineParser()
  port.pipe(parser)
  //parser.on('data', console.log)
  // ROBOT ONLINE
