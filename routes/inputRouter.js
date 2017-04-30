const express = require( 'express' ),
      inputController = require( '../controllers/inputController' ),
      router = express.Router();

router.get( '/', inputController.readInputs );
router.put( '/', inputController.updateInputs );

module.exports = router;
