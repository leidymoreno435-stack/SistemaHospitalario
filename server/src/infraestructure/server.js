import app from "../app.js";
import sequelize from "./postgreSQL.js";


const PORT = 3000;


async function start() {

    try {

        console.log('DEBUG sequelize type:', sequelize && typeof sequelize);
        console.log('DEBUG sequelize keys:', sequelize && Object.keys(sequelize));
        console.log('DEBUG authenticate exists:', sequelize && sequelize.authenticate);

        await sequelize.authenticate();

        console.log("✅ Base de datos conectada");


        app.listen(PORT, () => {
            console.log(`🚀 Servidor en puerto ${PORT}`);
        });


    } catch (error) {

        console.log("❌ Error BD:", error);

    }

}


start();