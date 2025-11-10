require('dotenv').config(); // To use environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your frontend to communicate with this backen 
app.use(express.json());
app.use(morgan("tiny"))
app.use('/uploads', express.static('uploads'));
app.use('/songs', express.static('songs'));


// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error(err));

// --- API Routes ---
app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/songs', require('./routes/songs'));
// app.use('/api/auth', require('./routes/auth')); // For user authentication

// --- Start the server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});