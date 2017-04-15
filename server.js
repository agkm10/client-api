const   express = require('express')
 				, cors = require('cors')
 				, bodyParser = require('body-parser')
 				, port = 3002
				, session = require("express-session")
        , passport = require('./passport')
        , app = express()

// app.use(session(serverConfig.session) );
app.use(cors())
app.use(bodyParser.json())
app.use("/", express.static('../client/public'));



app.listen(port, function() {
  console.log('Server listening on port', port)
})
