const express = require('express');
const router = express.Router();
const songController = require('../controller/songController');


router.get('/', songController.getLandingPage)
router.post('/', songController.getAllSongs);
//router.get('/:title', songController.getSongByTitle);
/*router.post();
router.put();
router.delete();*/




module.exports = router;