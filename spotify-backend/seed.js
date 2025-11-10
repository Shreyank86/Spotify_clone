require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/song');

const songsToSeed = [
    {
        title: "Believer",
        artist: "Imagine Dragons",
        album: "Evolve",
        duration: 204,
        filePath: "/music/Imagine Dragons - Believer (Lyrics).mp3",
        thumbnailPath: "/uploads/images/images (1).png"
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        duration: 233,
        filePath: "/music/alan-walker-dreamer-marshmello-pad-music-mix-alan-amjad-audio-163694.mp3",
        thumbnailPath: "/uploads/images/images (2).png"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200,
        filePath: "/music/amazing-grace-william-walker-version-1835-arranged-for-piano-239125.mp3",
        thumbnailPath: "/uploads/images/images.png"
    }
];

async function seedDB() {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to DB");

        await Song.deleteMany({});
        console.log("🗑️ Old songs removed");

        await Song.insertMany(songsToSeed);
        console.log("🎵 Songs added successfully!");

    } catch (error) {
        console.error("❌ Error seeding DB:", error);
    } finally {
        mongoose.connection.close();
        console.log("🔌 DB connection closed");
    }
}

seedDB();
