import app from './app.js';
import sequelize from "./infraestructure/database/postgres.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('📡 [DATABASE]: ¡Conexión a PostgreSQL establecida con éxito!');

        await sequelize.sync({ alter: true });

        app.listen(PORT, () => {
            console.log(`🚀 [SERVER]: Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ [DATABASE]: Error crítico, no se pudo conectar a la base de datos:', error);
        process.exit(1);
    }
}

startServer();