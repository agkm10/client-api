const db = require( '../db' ),
      userFunc = require( '../functions.js' ),
      passport = require( 'passport' );

module.exports = {
    fetchAllMessages: data => {
        return db( 'chats' )
            .where( 'chats.user_id', data )
            .join( 'messages','chats.user_id','messages.user_id' )
            .join( 'users', 'users.id', 'messages.user_id' )
            .select( 'chats.id as chat_id','chats.user_id as user_id','chats.admin_id as admin_id', 'messages.created_at as timestamp','messages.message as message','messages.type as type','messages.read as read', 'users.firstname as firstname','users.lastname as lastname' )
            .orderBy( 'timestamp' )
            .then( response => {
                return response
            })
    },
    insertMessage: data => {
        let messageObj = {
            chat_id:data.chatid,
            message:data.message,
            user_id:data.userid,
            type:'user'
        }
        return db( 'messages' )
            .returning( [ 'chat_id','user_id','created_at as timestamp','message','type','read' ] )
            .insert( messageObj )
            .then( response => {
                return userFunc.flatten( response )
            })
    },
    updateChat: data => {
        return db( 'messages' )
            .where( 'user_id', data )
            .andWhere( 'type', 'admin' )
            .andWhere( 'read', false )
            .update( { read: true, updated_at: new Date() } )
            .returning()
            .then( () => {
                return
            })
    }
}
