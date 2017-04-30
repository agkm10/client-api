const express = require( 'express' ),
      usersCtrl = require( '../controllers/usersCtrl' ),
      router = express.Router();

router.get( '/',usersCtrl.readUser )


module.exports = router;
