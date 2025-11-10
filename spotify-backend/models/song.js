const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: { type: String },
    artist: { type: String },
    album: { type: String },
    duration: { type: Number }, // in seconds
    filePath: { type: String }, // Path to the audio file on your server
    thumbnailPath: { type: String } // Path to the song/album cover
});

module.exports = mongoose.model('Song', SongSchema);