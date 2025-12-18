const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: String,
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }]
});

const artist = mongoose.model('Artist', artistSchema);

module.exports = artist;