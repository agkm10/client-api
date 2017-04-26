const db = require('../db.js');
const dropboxkey = require('../dropboxConfig.js')
//need to add in passport to use req.session.user_id
module.exports = {

  readInputs: function(req, res, next) {
    user_id = req.session.passport.user
    db('intakegs').returning('*').from('userdata').where('user_id', user_id).then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  },

  updateInputs: function(req, res, next) {
    user_id = req.session.passport.user
    db('userdata').returning('*').where('user_id', 2).update(req.body).then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })
  },

  uploadFile: function(req, res, next) {
    user_id = req.session.passport.user
    db('intakegs').returning('*').from('userdata').where('user_id', user_id).then(function(results) {
      var uploadInfo = {
        dropboxkey: dropboxkey,
        company: results[0].company
      }
      return res.status(200).json(uploadInfo)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  },

  readComps: function(req, res, next) {
    //TODO change to req.user.id
    user_id = req.session.passport.user
    db.select('id', 'user_id', 'compName', 'statusName', 'completed').from('components').where('user_id', user_id).then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  },

  createComps: function(req, res, next) {
    console.log('req query', req.body[0])
    db('components').returning('*').insert(req.body[0]).then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  },

  updateComps: function(req, res, next) {
    console.log('req query', req.body)
    db('components')
    .returning('*')
    .where('user_id', req.session.passport.user)
    .where('compname', req.body.compName)
    .insert(req.body.completed)
    .then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  }
}
