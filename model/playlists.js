const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }]
});

const playlist = mongoose.model('Playlist', playlistSchema);

module.exports = playlist;