const express = require('express');
const Playlist = require('./models/playlist');
//const Sequelize = require('sequelize');

const app = express();


app.get('/api/playlists', (req, res) => {
    Playlist.findAll().then((playlists) => {
        res.json(playlists);
    })
});

app.listen(8000, () => {
    console.log(`server running on port 8000`);
});