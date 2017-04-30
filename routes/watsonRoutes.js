const express = require( 'express' ),
      watsonCtrl = require( '../controllers/watsonCtrl' ),
      router = express.Router();

router.get( '/message', watsonCtrl.getMessage )
router.post( '/message', watsonCtrl.postMessage )

module.exports = router;
