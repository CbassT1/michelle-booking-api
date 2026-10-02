const supabase = require('../config/supabase');

const getServices = async (req, res) => {
    try {
        const { data, error } = await supabase.from('servicios').select('*').eq('activo', true);
        
        if (error) throw error;
        
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

module.exports = {
    getServices
};