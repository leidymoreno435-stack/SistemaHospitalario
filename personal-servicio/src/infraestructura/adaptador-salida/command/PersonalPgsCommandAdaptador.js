import { Transaction } from "sequelize";
import personalSalidaCommandPuerto from "../../../aplicacion/puertos/salida/PersonalSalidaCommandPuerto.js";
import personalTabla, { sequelize } from '../../base-dato/orm/PersonalTabla.js'

export default class PersonalPgsCommandAdaptador extends personalSalidaCommandPuerto {

    /*ATOMICIDAD */
    guardar = async(personal) => {
        const nombre = personal.getNombre();

        //consistencia
        if (nombre === "") {
            throw new Error("error en la validacion");
        }
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED //aislamiento
        });
        try {
            const nuevoUsuario = await usuarioTabla.create({
                usu_nombre: nombre
            }, { transaction });
            (await transaction).commit();
            console.log('Se guardó usando el adaptador SQL')
            return {
                estado: "ok",
                resultado: "se guardo con exito en la BD: " + nombre,
                id: nuevoUsuario.usu_codigo

            }
        } catch (e) {
            (await transaction).rollback();
            return {
                estado: "error",
                resultado: "ocurrio un error: " + e
            }
        }
    }

    eliminar = async(usuario) => {
        const id = usuario.getId();
        const transaccion = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED //aislamiento
        });

        try {
            //consistencia
            if (id === "") {
                throw new Error("error en la validacion");
            }
            const usuarioEncontrado = await usuarioTabla.findByPk(id, { transaccion });
            await usuarioEncontrado.destroy({ transaccion });
            (await transaccion).commit();
            console.log('Se guardó usando el adaptador SQL')
            return {
                estado: "ok",
                resultado: "se guardo con exito en la BD: " + id
            }
        } catch (e) {
            (await transaccion).rollback();
            return {
                estado: "error",
                resultado: "ocurrio un error: " + e
            }
        }
    }
}