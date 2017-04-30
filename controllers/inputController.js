const db = require( '../db.js' ),
      config = require( '../config.json' );

module.exports = {
    readInputs: ( req, res, next ) => {
        let user_id = req.user.id
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
        user_id = req.user.id
        db( 'userdata' )
        .where( 'user_id', user_id )
        .update( req.body, '*' )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    uploadFile: ( req, res, next ) => {
        let user_id = req.user.id
        db( 'users' )
        .returning( '*' )
        .where( 'id', user_id )
        .then( results => {
            let uploadInfo = {
                dropboxkey: config.dropboxKey,
                company: results[0].company
            }
            return res.status( 200 ).json( uploadInfo )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    readComps: ( req, res, next ) => {
        let user_id = req.user.id
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
        .insert( req.body[ 0 ] )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    updateComps: ( req, res, next ) => {
        let user_id = req.user.id
        let compComplete = {
            completed:req.body.completed
        }
        db( 'components' )
        .where( 'user_id', user_id )
        .andWhere( 'compName',req.body.component )
        .update( compComplete, '*' )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    }
}
