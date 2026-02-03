const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    artist: String,
    filePath: { type: String, required: true }
});

const song = mongoose.model('Song', songSchema);

module.exports = song;