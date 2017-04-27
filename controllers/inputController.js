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
    db('userdata').where('user_id', user_id).update(req.body, '*').then(function(results) {
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
    user_id = req.session.passport.user
    db.select('id', 'user_id', 'compName', 'statusName', 'completed').from('components').where('user_id', user_id).then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  },

  createComps: function(req, res, next) {
    db('components').returning('*').insert(req.body[0]).then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  },

  updateComps: function(req, res, next) {
    var compComplete = {
      completed: req.body.completed
    }
    db('components')
    .where(function() {
      this.where('user_id', req.session.passport.user)
      .andWhere('compName', req.body.component)
    })
    .update(compComplete, '*')
    .then(function(results) {
      return res.status(200).json(results)
    }).catch(function(err) {
      console.log(err)
      return res.status(500).json(err);
    })

  }
}
