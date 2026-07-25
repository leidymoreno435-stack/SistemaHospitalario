/*import pkg from 'pg';
const {Pool} = pkg;
const configPgsql = new Pool( {
    host: 'postgres',
    port: 5432,
    user: 'jonathan',
    password: '123456',
    database: 'arquitecturahexagonal',
    max:3
});
configPgsql.on('connect', () => {
    console.log('Nueva conexión creada');
});
export default configPgsql;   
*/

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "usuario_db",
  "postgres",
  "postgres",
  {
    host: "usuario-db",
    port: 5432,
    dialect: "postgres",
    logging: console.log,
  }
); 
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión ORM con PostgreSQL creada");
  })
  .catch((error) => {
    console.error("Error al conectar con PostgreSQL:", error);
  });

export default sequelize;