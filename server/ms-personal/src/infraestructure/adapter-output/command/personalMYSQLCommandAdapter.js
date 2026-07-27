import { Transaction } from "sequelize";
import personalCommandOutput from "../../../application/ports/output/command/personalCommandOutput.js";
import personalModel, { sequelize } from '../../base-dato/orm/personalModel.js'

export default class personalMYSQLCommandAdapter extends personalCommandOutput {

    /*ATOMICIDAD */
    create = async(personal) => {
        const nombre = personal.getNombres();

        //consistencia
        if (nombre === "") {
            throw new Error("error en la validacion");
        }
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED //aislamiento
        });
        try {
            const nuevoPersonal = await personalModel.create({
                nombres: personal.getNombres(),
                apellidos: personal.getApellidos(),
                identificacion: personal.getIdentificacion(),
                id_usuario: personal.getId_usuario(),
                id_especialidad: personal.getId_especialidad(),
                telefono: personal.getTelefono(),
                email: personal.getEmail(),
                activo: personal.getActivo(),
                creado_en: personal.getCreado_en()
            }, { transaction });
            await transaction.commit();
            console.log('Se guardó usando el adaptador SQL')
            return {
                estado: "ok",
                resultado: "se guardo con exito en la BD: " + nombre,
                id: nuevoPersonal.id_personal
            }
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: "ocurrio un error: " + e
            }
        }
    }

    delete = async(personal) => {
        const id = personal.getId_personal();
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED //aislamiento
        });

        try {
            //consistencia
            if (id === "") {
                throw new Error("error en la validacion");
            }
            const personalEncontrado = await personalModel.findByPk(id, { transaction });
            if (!personalEncontrado) {
                throw new Error("Personal no encontrado");
            }
            await personalEncontrado.destroy({ transaction });
            await transaction.commit();
            console.log('Se eliminó usando el adaptador SQL')
            return {
                estado: "ok",
                resultado: "se eliminó con exito en la BD: " + id
            }
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: "ocurrio un error: " + e
            }
        }
    }
}