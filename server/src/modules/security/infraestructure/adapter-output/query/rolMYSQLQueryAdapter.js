import rolQueryOutput from "../../../../application/ports/output/query/rolQueryOutput.js";
import rolFilter from "../../../../application/ports/input/query/rolFilter.js";
import rolModel, { sequelize } from "../model/rolModel.js";
import { Transaction } from 'sequelize';

export default class rolMYSQLQueryAdapter extends rolQueryOutput {
    read = async(filter = []) => {

        console.log("Listando la tabla rol...");
        const where = [];

        filter.forEach(esp => {
            if (esp instanceof rolFilter) {
                where.rol_nombre = esp.name;
            }
        });
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });
        try {
            const rol = await rolModel.findAll({ where, transaction });
            (await transaction).commit();
            console.log("Se listó usando el adaptador SQL");
            return {
                estado: "ok",
                resultado: rol
            };
        } catch (e) {
            (await transaction).rollback();
            return {
                estado: "error",
                resultado: "ocurrio un error: " + e
            };
        }

    }
}