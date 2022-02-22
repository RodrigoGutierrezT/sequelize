const express = require('express');
const Playlist = require('./models/playlist');
const Artist = require('./models/artist');
const Album = require('./models/album');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

const app = express();

Artist.hasMany(Album, {
    foreignKey: 'ArtistId'
});

Album.belongsTo(Artist, {
    foreignKey: 'ArtistId'
})

app.get('/api/playlists', (req, res) => {
    let filter = {};
    let {q} = req.query;

    if (q) {
        filter = {
            where: {
                name: {
                    [Op.like]: `${q}%`
                }
            }
        }
    }

    Playlist.findAll(filter).then((playlists) => {
        res.json(playlists);
    })
});

app.get('/api/playlists/:id', (req, res) => {

    let { id } = req.params

    Playlist.findByPk(id).then((playlist) => {
        if (playlist) {
            res.json(playlist);
        } else {
            res.status(404).json('playlist not found');
        }
    })
});

app.get('/api/artists/:id', (req, res) => {

    let { id } = req.params

    Artist.findByPk(id, {
        include: [Album]
    }).then((artist) => {
        if (artist) {
            res.json(artist);
        } else {
            res.status(404).send();
        }
    })
});

app.get('/api/albums/:id', (req, res) => {

    let { id } = req.params

    Album.findByPk(id, {
        include: [Artist]
    }).then((album) => {
        if (album) {
            res.json(album);
        } else {
            res.status(404).send();
        }
    })
});

app.listen(8000, () => {
    console.log(`server running on port 8000`);
});

module.exports = app;