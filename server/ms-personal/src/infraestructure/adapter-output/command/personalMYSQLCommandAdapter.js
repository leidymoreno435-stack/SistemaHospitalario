import { Transaction, Op } from "sequelize";
import personalCommandOutput from "../../../application/ports/output/command/personalCommandOutput.js";
import personalModel, { sequelize } from '../../base-dato/orm/personalModel.js';

export default class personalMYSQLCommandAdapter extends personalCommandOutput {

    /* CREATE */
    create = async (personal) => {
        const nombre = personal.getNombres();
        const identificacion = personal.getIdentificacion();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            // Consistencia y Regla de Negocio: Control de duplicados (Rúbrica - Punto 4)
            if (identificacion) {
                const existe = await personalModel.findOne({
                    where: { identificacion },
                    transaction
                });
                if (existe) {
                    throw new Error("Ya existe un miembro del personal registrado con esta identificación.");
                }
            }

            const nuevoPersonal = await personalModel.create({
                nombres: personal.getNombres(),
                apellidos: personal.getApellidos(),
                identificacion: personal.getIdentificacion(),
                id_usuario: personal.getId_usuario(),
                id_especialidad: personal.getId_especialidad(),
                telefono: personal.getTelefono(),
                email: personal.getEmail(),
                activo: personal.getActivo() ?? true,
                creado_en: personal.getCreado_en() || new Date()
            }, { transaction });

            await transaction.commit();
            console.log('Se guardó usando el adaptador SQL');

            return {
                estado: "ok",
                resultado: `Se guardó con éxito en la BD: ${nombre}`,
                id: nuevoPersonal.id_personal
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: e.message || "Ocurrió un error al crear el personal"
            };
        }
    };

    /* UPDATE (Agregado para cumplir la Rúbrica - Puntos 2 y 3) */
    update = async (personal) => {
        const id = personal.getId_personal();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            if (!id) {
                throw new Error("Se requiere un ID de personal válido para actualizar.");
            }

            const personalEncontrado = await personalModel.findByPk(id, { transaction });
            if (!personalEncontrado) {
                throw new Error("Personal no encontrado");
            }

            // Control de duplicados si se modifica la identificación
            const nuevaIdentificacion = personal.getIdentificacion();
            if (nuevaIdentificacion && nuevaIdentificacion !== personalEncontrado.identificacion) {
                const duplicado = await personalModel.findOne({
                    where: {
                        identificacion: nuevaIdentificacion,
                        id_personal: { [Op.ne]: id }
                    },
                    transaction
                });
                if (duplicado) {
                    throw new Error("Ya existe otro registro de personal con esa identificación.");
                }
            }

            // Actualización preservando valores no enviados (Coalescencia)
            await personalEncontrado.update({
                nombres: personal.getNombres() ?? personalEncontrado.nombres,
                apellidos: personal.getApellidos() ?? personalEncontrado.apellidos,
                identificacion: personal.getIdentificacion() ?? personalEncontrado.identificacion,
                id_usuario: personal.getId_usuario() ?? personalEncontrado.id_usuario,
                id_especialidad: personal.getId_especialidad() ?? personalEncontrado.id_especialidad,
                telefono: personal.getTelefono() ?? personalEncontrado.telefono,
                email: personal.getEmail() ?? personalEncontrado.email,
                activo: personal.getActivo() ?? personalEncontrado.activo
            }, { transaction });

            await transaction.commit();
            console.log('Se actualizó usando el adaptador SQL');

            return {
                estado: "ok",
                resultado: `Se actualizó con éxito el personal con ID: ${id}`
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: e.message || "Ocurrió un error al actualizar el personal"
            };
        }
    };

    /* DELETE */
    delete = async (personal) => {
        const id = personal.getId_personal();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            if (!id) {
                throw new Error("Se requiere un ID de personal válido para eliminar.");
            }

            const personalEncontrado = await personalModel.findByPk(id, { transaction });
            if (!personalEncontrado) {
                throw new Error("Personal no encontrado");
            }

            await personalEncontrado.destroy({ transaction });
            await transaction.commit();
            console.log('Se eliminó usando el adaptador SQL');

            return {
                estado: "ok",
                resultado: `Se eliminó con éxito en la BD el ID: ${id}`
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: e.message || "Ocurrió un error al eliminar el personal"
            };
        }
    };
}