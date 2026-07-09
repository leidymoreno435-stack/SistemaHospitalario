import app from '../app.js';
import sequelize from '../infraestructure/database/postgreSQL.js'; // O la ruta correcta a tu postgreSQL.js

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('📡 [DATABASE]: ¡Conexión a PostgreSQL establecida con éxito!');

        // Si usas modelos de Sequelize y quieres sincronizarlos automáticamente:
        await sequelize.sync({ alter: true });

        // LEVANTA EL SERVIDOR EXPRESS
        app.listen(PORT, () => {
            console.log(`🚀 [SERVER]: Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ [DATABASE]: Error crítico, no se pudo conectar a la base de datos:', error);
        process.exit(1); // Apaga el contenedor si falla la BD
    }
}

startServer();