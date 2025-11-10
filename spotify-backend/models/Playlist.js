const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    thumbnailPath: { type: String, required: true }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);