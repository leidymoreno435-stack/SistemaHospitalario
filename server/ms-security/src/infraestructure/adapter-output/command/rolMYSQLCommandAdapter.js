import rolCommandOutput from "../../../application/ports/output/command/rolCommandOutput.js";
import rolModel, { sequelize } from "../../model/rolModel.js";
import { Transaction } from 'sequelize';
export default class rolMYSQLCommandAdapter extends rolCommandOutput {

    /*Atomicidad*/
    create = async(rol) => {
        const nombre = await rol.getNombre();
        //consistencia
        if (nombre === "") {
            throw new Error("Error en la validacion del nombre");
        }
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            await rolModel.create({
                nombre: rol.getNombre(),
                descripcion: rol.getDescripcion()
            }, { transaction });

            await transaction.commit();
            console.log("Se guardó usando el adaptador SQL");
            return {
                estado: "ok",
                resultado: "Se guardó con exito en la BD: " + nombre
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: "ocurrio un error: " + e
            };
        }
    }

    delete = async(rol) => {
        const id = await rol.getId();
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {

            if (id === "") {
                throw new Error("Error en la validacion del id");
            }
            const rolFound = await rolModel.findByPk(id, { transaction });
            await rolFound.destroy({ transaction });
            await transaction.commit();
            console.log("Se eliminó usando el adaptador SQL");
            return {
                estado: "ok",
                resultado: "Se eliminó con exito en la BD: " + id
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