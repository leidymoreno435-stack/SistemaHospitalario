import usuarioQueryOutput from "../../../application/ports/output/query/usuarioQueryOutput.js";
import usuarioFilter from "../../../domain/filters/usuarioFilter.js";
import usuarioModel from "../../model/usuarioModel.js";
import { Transaction } from 'sequelize';

export default class UsuarioMYSQLQueryAdaptador extends usuarioQueryOutput {
    read = async(filter = []) => {

        console.log("Listando la tabla usuarios...");
        const where = {};

        filter.forEach(esp => {
            if (esp instanceof UsuarioFilter) {
                where.usu_nombre = esp.username;
            }
        });
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });
        try {
            const usuarios = await usuarioModel.findAll({ where, transaction });
            await transaction.commit();
            console.log("Se listó usando el adaptador SQL");
            return {
                estado: "ok",
                resultado: usuarios
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: "ocurrio un error: " + e
            };
        }

    }
}