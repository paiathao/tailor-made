let app = require('../server')
let testServer = require('supertest')

describe('testing route', () => {
    test('the /user route returns a 403 when unauthenticated', async () => {
       let response = await testServer(app).get('/api/customer')
       expect(response.statusCode).toBe(403);
    })
})