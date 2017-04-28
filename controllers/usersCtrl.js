const db = require( '../db' ),
      userFunc = require( '../functions.js' );

module.exports = {
    readUser: ( req, res ) => {
        if ( !req.user ) {
        }
        delete req.user.password
        userFunc.handleResponse( res, 200, 'success', userFunc.returnUser(req.user) )
    }
}
