import app from './app.js';
import sequelize from "./infraestructure/database/postgres.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3004;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('📡 [DATABASE]: Conexión a PostgreSQL establecida con éxito');
        
        await sequelize.sync();

        app.listen(PORT,()=>{
            console.log(`🚀 [SERVER]: ${'ms-clinical'} corriendo en http://localhost:${PORT}`);
        });

    } catch(error){
        console.error('❌ [DATABASE]: Error crítico:', error);
        process.exit(1);
    }
}

startServer();
