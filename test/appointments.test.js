const request = require('supertest');
const app = require('../src/app');
const supabase = require('../src/config/supabase');

describe('Endpoint de Citas', () => {
    let servicioId;

    beforeAll(async () => {
        // Consultamos un servicio real para usar su ID
        const { data } = await supabase.from('servicios').select('id').limit(1);
        servicioId = data[0].id;
    });

    it('POST /api/appointments debería crear una nueva cita sin chocar', async () => {
        // Generamos fechas dinámicas en el futuro (entre 1 y 1000 días adelante) para evitar choques con pruebas anteriores
        const diasAleatorios = Math.floor(Math.random() * 1000) + 1;
        const fechaFutura = new Date();
        fechaFutura.setDate(fechaFutura.getDate() + diasAleatorios);
        
        const fechaInicio = new Date(fechaFutura.setHours(10, 0, 0, 0)).toISOString();
        const fechaFin = new Date(fechaFutura.setHours(12, 0, 0, 0)).toISOString();

        const nuevaCita = {
            servicio_id: servicioId,
            fecha_hora_inicio: fechaInicio,
            fecha_hora_fin: fechaFin,
            clienta_nombre: 'Clienta de Prueba',
            clienta_email: 'prueba@ejemplo.com',
            clienta_telefono: '8112345678',
            notas_adicionales: 'Cita generada con fecha dinámica'
        };

        const response = await request(app)
            .post('/api/appointments')
            .send(nuevaCita);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.clienta_nombre).toBe('Clienta de Prueba');
        expect(response.body.estado).toBe('pendiente');
    });
});