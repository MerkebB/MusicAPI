const express = require('express');
const router = express.Router();
const songController = require('../controller/songController');
const upload = require('../middleware/upload');


router.get('/', songController.getLandingPage)
router.get('/allSongs', songController.getAllSongs);
router.get('/searchbyTitle', songController.getSongByTitle);
router.post('/upload', upload.single("song"), songController.postUpload);
//router.put();
router.get('/delete', songController.deleteSong);




module.exports = router;