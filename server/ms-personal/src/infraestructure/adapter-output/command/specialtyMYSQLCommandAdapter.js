import { Transaction, Op } from "sequelize";
import specialtyCommandOutput from "../../../application/ports/output/command/specialtyCommandOutput.js";
import specialtyModel, { sequelize } from '../../model/specialtyModel.js';

export default class specialtyMYSQLCommandAdapter extends specialtyCommandOutput {

    /* CREATE */
    create = async (specialty) => {
        const nombre = specialty.getNombre();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            // Control de duplicados por nombre de especialidad
            if (nombre) {
                const existe = await specialtyModel.findOne({
                    where: { nombre },
                    transaction
                });
                if (existe) {
                    throw new Error("Ya existe una especialidad registrada con este nombre.");
                }
            }

            const nuevaEspecialidad = await specialtyModel.create({
                nombre: specialty.getNombre(),
                descripcion: specialty.getDescripcion()
            }, { transaction });

            await transaction.commit();
            console.log('Se guardó usando el adaptador SQL');

            return {
                estado: "ok",
                resultado: `Se guardó con éxito en la BD: ${nombre}`,
                id: nuevaEspecialidad.id_especialidad
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: e.message || "Ocurrió un error al crear la especialidad"
            };
        }
    };

    /* UPDATE */
    update = async (specialty) => {
        const id = specialty.getId_especialidad();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            if (!id) {
                throw new Error("Se requiere un ID de especialidad válido para actualizar.");
            }

            const especialidadEncontrada = await specialtyModel.findByPk(id, { transaction });
            if (!especialidadEncontrada) {
                throw new Error("Especialidad no encontrada");
            }

            // Control de duplicados si se modifica el nombre
            const nuevoNombre = specialty.getNombre();
            if (nuevoNombre && nuevoNombre !== especialidadEncontrada.nombre) {
                const duplicado = await specialtyModel.findOne({
                    where: {
                        nombre: nuevoNombre,
                        id_especialidad: { [Op.ne]: id }
                    },
                    transaction
                });
                if (duplicado) {
                    throw new Error("Ya existe otra especialidad registrada con este nombre.");
                }
            }

            // Actualización preservando valores no enviados (Coalescencia)
            await especialidadEncontrada.update({
                nombre: specialty.getNombre() ?? especialidadEncontrada.nombre,
                descripcion: specialty.getDescripcion() ?? especialidadEncontrada.descripcion
            }, { transaction });

            await transaction.commit();
            console.log('Se actualizó usando el adaptador SQL');

            return {
                estado: "ok",
                resultado: `Se actualizó con éxito la especialidad con ID: ${id}`
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: e.message || "Ocurrió un error al actualizar la especialidad"
            };
        }
    };

    /* DELETE */
    delete = async (specialty) => {
        const id = specialty.getId_especialidad();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            if (!id) {
                throw new Error("Se requiere un ID de especialidad válido para eliminar.");
            }

            const especialidadEncontrada = await specialtyModel.findByPk(id, { transaction });
            if (!especialidadEncontrada) {
                throw new Error("Especialidad no encontrada");
            }

            await especialidadEncontrada.destroy({ transaction });
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
                resultado: e.message || "Ocurrió un error al eliminar la especialidad"
            };
        }
    };
}