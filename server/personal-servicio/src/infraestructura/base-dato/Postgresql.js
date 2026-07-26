import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "SISHOSPITAL",
    "postgres", //usuario
    "postgres", //contraseña deje estos xq pues tenemos distinto deberiamos ver una forma de tener el mismo o usar las mismas contras o este intentar no subirlo para q no haya tanto problema 
    {
        host: "localhost",
        port: 5432,
        dialect: "postgres",
        logging: console.log,
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Conexión ORM con PostgreSQL creada correctamente.");
    })
    .catch((error) => {
        console.error("Error al conectar con PostgreSQL:", error);
    });

export default sequelize;