const request = require('supertest');
const app = require('../app');

/**
 * Testing get an album endpoint by giving a non-existing album id
 */
 describe('GET /api/albums/:id', () => {
    it('respond with json album not found', (done) => {
        request(app)
            .get('/api/albums/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect(/album not found/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing get an album endpoint by giving an existing album id
 */
 describe('GET /api/albums/:id', () => {
    it('respond with json containing a single album', (done) => {
        request(app)
            .get('/api/albums/10')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(/Audioslave/)
            .expect(200, done);
    });
});