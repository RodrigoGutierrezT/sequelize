const request = require('supertest');
const app = require('../app');

/**
 * Testing get an track endpoint by giving a non-existing track id
 */
 describe('GET /api/tracks/:id', () => {
    it('respond with json track not found', (done) => {
        request(app)
            .get('/api/tracks/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect(/track not found/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing get an track endpoint by giving an existing track id
 */
 describe('GET /api/tracks/:id', () => {
    it('respond with json containing a single track', (done) => {
        request(app)
            .get('/api/tracks/10')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(/Evil Walks/)
            .expect(200, done);
    });
});