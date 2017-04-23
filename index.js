const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  session = require("express-session"),
  passport = require('./passport'),
  app = express(),
  config = require('./config.json'),
  inputRoutes = require('./routes/inputRouter'),
  compRoutes = require('./routes/compRouter'),
  uploadRoutes = require('./routes/uploadRouter'),
  userRoutes = require('./routes/userRoutes.js'),
  mainRoutes = require('./routes/mainRoutes.js'),
  clientRoutes = require('./routes/clientRoutes.js'),
  messageRoutes = require('./routes/messageRoutes.js'),
  socketCtrl = require('./controllers/socketCtrl'),
  router=express.Router(),
  corsOptions = {
    origin: [`http://localhost:${config.port0}`, `http://localhost:${config.port2}`],
    credentials: true
  },
  server = require('http').createServer(app),
  io = require('socket.io')(server);

// app.use(session(serverConfig.session) );
io.on('connection', socket => {
    socket.on('authenticated', function(data){
        socket.emit('socketid',socket.id)
        socket.join(data)
        socketCtrl.fetchAllMessages(data)
        .then(response=>{
          socket.emit('messagesfetched',response)
        })
    })

})

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(session({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.use('/api', mainRoutes);
app.use('/api/user', userRoutes);
app.use('/api/messages', messageRoutes);
// app.use('/api/client', clientRoutes)
app.use('/api/inputs', inputRoutes);
app.use('/api/comps', compRoutes);
app.use('/api/upload', uploadRoutes)

server.listen(config.port2, function() {
  console.log(`Server listening on port, ${config.port2}`)
})
