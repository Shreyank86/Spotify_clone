const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Song = require('../models/song');

router.get('/stream/:songId', async (req, res) => {
    try {
        const song = await Song.findById(req.params.songId);
        if (!song) return res.status(404).send('Song not found.');

        const musicPath = path.resolve(__dirname, '..', 'music', song.filePath);
        if (!fs.existsSync(musicPath)) return res.status(404).send('Audio file missing');

        const stat = fs.statSync(musicPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
            const start = parseInt(startStr, 10);
            const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
            const chunksize = end - start + 1;
            const file = fs.createReadStream(musicPath, { start, end });

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'audio/mpeg'
            });
            file.pipe(res);

        } else {
            res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': 'audio/mpeg'
            });
            fs.createReadStream(musicPath).pipe(res);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
