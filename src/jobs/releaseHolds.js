const cron = require('node-cron');
const supabase = require('../config/supabase');

const startCronJobs = () => {

    cron.schedule('*/5 * * * *', async () => {
        try {
            const treintaMinutosAtras = new Date(Date.now() - 30 * 60 * 1000).toISOString();

            const { error } = await supabase
                .from('citas')
                .update({ estado: 'cancelada' })
                .eq('estado', 'pendiente')
                .lt('created_at', treintaMinutosAtras);

            if (error) throw error;
            
        } catch (error) {
            console.error('Error al ejecutar el CRON de limpieza:', error);
        }
    });
};

module.exports = startCronJobs;