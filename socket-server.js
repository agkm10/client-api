const socketCtrl = require( './controllers/socketCtrl' ),
      db = require( './db' )

module.exports = ( io, socketClient ) => {
    io.on( 'connection', socket => {
        socket.on( 'authenticated', data => {
            socket.emit( 'socketid', socket.id )
            socketCtrl.fetchAllMessages( data )
            .then( response => {
                socket.join( response[ 0 ].chat_id )
                socket.emit( 'messagesfetched', response )
            })
        })
        socket.on( 'newmessage', data => {
            socketCtrl.insertMessage( data )
            .then( response => {
                socket.emit( 'messagereceived', response )
                db( 'chats' )
                .where( 'id', response[0].chat_id )
                .select( 'admin_id','id' )
                .then( response => {
                    socketClient.emit( 'newclientmessage', response[ 0 ] )
                })
            } )
        } )
        socket.on( 'fetchmessages', data => {
            socketCtrl.fetchAllMessages( data )
            .then( response => {
                socket.emit( 'messagesfetched', response )
            })
        })
        socket.on( 'chatread', data => {
            socketCtrl.updateChat( data )
            .then( () => {
                socketCtrl.fetchAllMessages( data )
                .then( response => {
                    socket.emit( 'messagesfetched', response )
                })
            })
        })
        socketClient.on( 'newmessageadmin', data => {
            socketCtrl.fetchAllMessages( data.userid )
            .then( response => {
                io.to( data.index ).emit( 'newmessageadmin', response )
            })
        })
    })
    socketClient.emit( 'node2connected' )
}
