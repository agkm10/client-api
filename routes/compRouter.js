const express = require( 'express' ),
      inputController = require( '../controllers/inputController' ),
      router = express.Router();

router.get( '/', inputController.readComps );
router.post( '/', inputController.createComps );
router.put( '/', inputController.updateComps );

module.exports = router;
