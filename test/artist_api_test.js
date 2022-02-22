const request = require('supertest');
const app = require('../app');

/**
 * Testing get an artist endpoint by giving a non-existing artist id
 */
 describe('GET /api/artists/:id', () => {
    it('respond with json artist not found', (done) => {
        request(app)
            .get('/api/artists/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect(/artist not found/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing get an artist endpoint by giving an existing artist id
 */
 describe('GET /api/artists/:id', () => {
    it('respond with json containing a single artist', (done) => {
        request(app)
            .get('/api/artists/3')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(/Aerosmith/)
            .expect(200, done);
    });
});