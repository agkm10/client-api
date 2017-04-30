const express = require( 'express' ),
      inputController = require( '../controllers/inputController' ),
      router = express.Router();

router.get( '/', inputController.uploadFile );

module.exports = router;
