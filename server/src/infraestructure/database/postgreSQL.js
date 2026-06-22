import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false
    }
);
/*sequelize.authenticate()
    .then(() => {
        console.log('Conexión creada');
    }).catch((err) => {
        console.error('Error al crear la conexión:', err);
    });*/
export default sequelize;