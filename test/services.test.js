const request = require('supertest');
const app = require('../src/app'); 

describe('Endpoint de Servicios', () => {
    it('GET /api/services debería devolver status 200 y un arreglo', async () => {
        const response = await request(app).get('/api/services');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});