const request = require('supertest');
const app = require('../app');

/**
 * Testing get all playlists endpoint
 */
 describe('GET /api/playlists', () => {
    it('respond with json containing a list of all playlists',  (done) => {
        request(app)
            .get('/api/playlists')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a user endpoint by giving a non-existing playlist
 */
 describe('GET /api/playlists/:id', () => {
    it('respond with json playlist not found', (done) => {
        request(app)
            .get('/api/playlists/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect(/playlist not found/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing get a playlist endpoint by giving an existing playlist id
 */
 describe('GET /api/playlists/:id', () => {
    it('respond with json containing a single playlist', (done) => {
        request(app)
            .get('/api/playlists/2')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(/Movies/)
            .expect(200, done);
    });
});