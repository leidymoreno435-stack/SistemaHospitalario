/**
 * PostgreSQL.js — Adaptador de conexión a base de datos
 *
 * Responsabilidad: Crear y exportar la instancia única de Sequelize (Singleton).
 * Patrón: Adapter (infraestructura) + Singleton.
 * Principio SOLID: DIP — El dominio y los casos de uso NUNCA importan esto;
 *                  solo los adaptadores de salida lo usan.
 */
import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_NAME     || 'SISHOSPITAL',
    process.env.DB_USER     || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        host:    process.env.DB_HOST || 'localhost',
        port:    parseInt(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,            // desactivar en producción para no ensuciar logs
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize
    .authenticate()
    .then(() => console.log('[ms-clinical] ✅ Conexión PostgreSQL establecida'))
    .catch(err  => console.error('[ms-clinical] ❌ Error de conexión:', err.message));

export default sequelize;
