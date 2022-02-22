const express = require('express');
const bodyParser = require('body-parser');
const Playlist = require('./models/playlist');
const Artist = require('./models/artist');
const Album = require('./models/album');
const Track = require('./models/track');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

const app = express();

app.use(bodyParser.json());

Artist.hasMany(Album, {
    foreignKey: 'ArtistId'
});

Album.belongsTo(Artist, {
    foreignKey: 'ArtistId'
});

Playlist.belongsToMany(Track, {
    through: 'playlist_track',
    foreignKey: 'PlaylistId',
    timestamps: false
});

Track.belongsToMany(Playlist, {
    through: 'playlist_track',
    foreignKey: 'TrackId',
    timestamps: false
})

app.post('/api/artists', (req, res) => {

    Artist.create({
        name: req.body.name  
    }).then((artist) => {
        res.json(artist)
    }, (validation) => {
        res.json({
            errors: validation.errors.map((error) => {
                return {
                    attribute: error.path,
                    message: error.message
                }
            })
        })
    })

});

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
        if (playlists) {
            res.json(playlists);
        } else {
            res.status(404).json('playlist not found');
        }
    })
});

app.get('/api/playlists/:id', (req, res) => {

    let { id } = req.params

    Playlist.findByPk(id, {
        include: [Track]
    }).then((playlist) => {
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
            res.status(404).json('artist not found');
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
            res.status(404).json('album not found');
        }
    })
});

app.get('/api/tracks/:id', (req, res) => {

    let { id } = req.params

    Track.findByPk(id, {
        include: [Playlist]
    }).then((track) => {
        if (track) {
            res.json(track);
        } else {
            res.status(404).json('track not found');
        }
    })
});

app.listen(8000, () => {
    console.log(`server running on port 8000`);
});

module.exports = app;