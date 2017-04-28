const watsonDeveloperCloud = require( 'watson-developer-cloud' ),
    ConversationV1 = require( 'watson-developer-cloud/conversation/v1' ),
    config = require( '../config.json' ),
    userFunc = require('../functions.js');

// Set up Conversation service.
let conversation = new ConversationV1({
    username: config.username,
    password: config.password,
    path: {workspace_id: config.workspace_id},
    version_date: config.version_date
});
// Start conversation with empty message.
let context = {};

module.exports = {

    getMessage: ( req, res ) => {
        conversation.message( {}, ( err, response ) => {
            context = response.context;
            if ( err ) {
                return userFunc.handleResponse(res,500,'error',err)
            }
            // Display the output from dialog, if any.
            if ( response.output.text.length !== 0 ) {
                return userFunc.handleReponse( res, 200 , response.output.text[0] )
            }
        });
    },
    postMessage: ( req, res, next ) => {
        conversation.message( {
            input: { text: req.body.message },
            context : context,
        }, ( err, response ) => {
            // TODO: Later put context on req.user
            // TODO: Save context to database
            context = response.context;
            if ( err ) {
                return userFunc.handleResponse( res, 500, 'error', err )
            }
            // Display the output from dialog, if any.
            if ( response.output.text.length !== 0 ) {
                return userFunc.handleResponse( res, 200, response.output.text[0] )
            }
            return userFunc.handleResponse( res, 200, "I didnt quite understand what you said" )
        })
    }

}
