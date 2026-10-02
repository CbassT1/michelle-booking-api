const supabase = require('../config/supabase');

const createAppointment = async (req, res) => {
    try {
        const {
            servicio_id,
            fecha_hora_inicio,
            fecha_hora_fin,
            clienta_nombre,
            clienta_email,
            clienta_telefono,
            notas_adicionales
        } = req.body;

        const { data: overlappingAppointments, error: checkError } = await supabase
            .from('citas')
            .select('id')
            .in('estado', ['pendiente', 'pagada', 'confirmada'])
            .lt('fecha_hora_inicio', fecha_hora_fin)
            .gt('fecha_hora_fin', fecha_hora_inicio);

        if (checkError) throw checkError;

        if (overlappingAppointments.length > 0) {
            return res.status(409).json({ error: 'El horario seleccionado ya no está disponible.' });
        }

        const { data, error } = await supabase
            .from('citas')
            .insert([
                {
                    servicio_id,
                    fecha_hora_inicio,
                    fecha_hora_fin,
                    clienta_nombre,
                    clienta_email,
                    clienta_telefono,
                    notas_adicionales,
                    estado: 'pendiente'
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la cita' });
    }
};

module.exports = {
    createAppointment
};