const db = require('../db.js');
const dropboxkey = require('../dropboxConfig.js')
//need to add in passport to use req.session.user_id
module.exports = {

  readInputs: function(req, res, next) {
    console.log('readInput Running')
    //TODO change to req.user.id
    user_id = 2
    db('intakegs').returning('*').from('users').where('id', user_id).then(function(results) {
      console.log('success')
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  },

  updateInputs: function(req, res, next) {
    console.log('createInputs Running', req.body)
    var id = 2;
    db('users').returning('*').where('id', 2).update(req.body).then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })
  },

  uploadFile: function(req, res, next) {
    console.log('running upload File')
    user_id = 2
    db('intakegs').returning('*').from('users').where('id', user_id).then(function(results) {
      console.log('success', results)
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
    user_id = 2
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

  }
}
