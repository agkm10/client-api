const   express = require('express')
 				, cors = require('cors')
 				, bodyParser = require('body-parser')
 				, port = 3002
				, session = require("express-session")
        , app = express()
        , config = require('./config.json')
        , inputRouter = require('./routes/inputRouter')
        , corsOptions = {
        origin:[`http://localhost:3000`, `http://localhost:3002`],
        credentials: true
        }

// app.use(session(serverConfig.session) );

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/', inputRouter);
app.use(session({secret: config.sessionSecret}));
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(config.port, function() {
  console.log('Server listening on port', config.port)
})
