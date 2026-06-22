import app from "./app.js";
import sequelize from "./config/database.js";


const PORT = 3000;


async function start() {

    try {

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