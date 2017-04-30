const express = require( 'express' ),
    cors = require( 'cors' ),
    bodyParser = require( 'body-parser' ),
    session = require( 'express-session' ),
    passport = require( './passport' ),
    config = require( './config.json' ),
    inputRoutes = require( './routes/inputRouter' ),
    compRoutes = require( './routes/compRouter' ),
    uploadRoutes = require( './routes/uploadRouter' ),
    userRoutes = require( './routes/userRoutes.js' ),
    mainRoutes = require( './routes/mainRoutes.js' ),
    clientRoutes = require( './routes/clientRoutes.js' ),
    messageRoutes = require( './routes/messageRoutes.js' ),
    watsonRouter = require( './routes/watsonRoutes.js' ),
    socketServer = require( './socket-server' ),
    socketNode2Node = require( 'socket.io-client' )( `http://localhost:${ config.port1 }`),
    router = express.Router(),
    corsOptions = {
        origin: [ `http://localhost:${config.port0}`, `http://localhost:${config.port2}` ],
        credentials: true
    },
    app = express(),
        server = require( 'http' ).createServer( app ),
        io = require( 'socket.io' )( server );

socketServer( io, socketNode2Node );

app.use( cors( corsOptions ) );
app.use( bodyParser.json() );
app.use( session( { secret: config.sessionSecret } ) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( router );


app.use( '/api', mainRoutes );
app.use( '/api/user', userRoutes );
app.use( '/api/messages', messageRoutes );
app.use( '/api/inputs', inputRoutes );
app.use( '/api/comps', compRoutes );
app.use( '/api/upload', uploadRoutes );
app.use( '/api/watson', watsonRouter );

server.listen( config.port2, () => {
    console.log( `CLIENT-API listening on port, ${config.port2}` )
})
