import usuarioCommandOutput from "../../../../application/ports/output/command/usuarioCommandOutput.js";
import usuarioModel, { sequelize } from "../model/usuarioModel.js";
import { Transaction } from 'sequelize';
export default class UsuarioMYSQLCommandAdapter extends usuarioCommandOutput {

    /*Atomicidad*/
    create = async(usuario) => {
        const username = await usuario.getUsername();
        //consistencia
        if (username === "") {
            throw new Error("Error en la validacion del nombre");
        }
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {

            await usuarioModel.create({
                username: username
            }, { transaction });

            (await transaction).commit();
            console.log("Se guardó usando el adaptador SQL");
            return {
                estado: "ok",
                resultado: "Se guardó con exito en la BD: " + username
            };
        } catch (e) {
            (await transaction).rollback();
            return {
                estado: "error",
                resultado: "ocurrio un error: " + e
            };
        }
    }

    delete = async(usuario) => {
        const id = await usuario.getId_usuario();
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {

            if (id === "") {
                throw new Error("Error en la validacion del id");
            }
            const usuarioFound = await usuarioModel.findByPk(id, { transaction });
            await usuarioFound.destroy({ transaction });
            (await transaction).commit();
            console.log("Se eliminó usando el adaptador SQL");
            return {
                estado: "ok",
                resultado: "Se eliminó con exito en la BD: " + id
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