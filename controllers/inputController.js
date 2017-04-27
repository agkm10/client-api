const db = require( '../db.js' ),
    dropboxkey = require( '../dropboxConfig.js' );
//need to add in passport to use req.session.user_id

module.exports = {
    readInputs: ( req, res, next ) => {
        let user_id = req.session.passport.user
        db( 'intakegs' )
        .returning( '*' )
        .from( 'userdata' )
        .where( 'user_id', user_id )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    updateInputs: ( req, res, next ) => {
        user_id = req.session.passport.user
        db( 'userdata' )
        .returning( '*' )
        .where( 'user_id', 2 )
        .update( req.body )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    uploadFile: ( req, res, next ) => {
        let user_id = req.session.passport.user
        db( 'intakegs' )
        .returning( '*' )
        .from( 'userdata' )
        .where( 'user_id', user_id )
        .then( results => {
            let uploadInfo = {
                dropboxkey: dropboxkey,
                company: results[0].company
            }
            return res.status( 200 ).json( uploadInfo )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    readComps: ( req, res, next ) => {
      //TODO change to req.user.id
        let user_id = req.session.passport.user
        db( 'components' )
        .select( 'id', 'user_id', 'compName', 'statusName', 'completed' )
        .where( 'user_id', user_id )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    createComps: ( req, res, next ) => {
        db( 'components' )
        .returning( '*' )
        .insert( req.body[0] )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    updateComps: ( req, res, next ) => {
        db( 'components' )
        .returning( '*' )
        .where( 'user_id', req.session.passport.user )
        .where( 'compname', req.body.compName )
        .insert( req.body.completed )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    }
}
