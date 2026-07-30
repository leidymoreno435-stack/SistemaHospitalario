import { Transaction, Op } from "sequelize"; // 👈 1. Importamos 'Op'
import consultaCommandOutput from "../../../application/ports/output/command/consultaCommandOutput.js";
import consultaModel, { sequelize } from "../../base-dato/orm/consultaModel.js";

export default class consultaMYSQLCommandAdapter extends consultaCommandOutput {

    // CREATE
    create = async(consulta) => {

        const idPaciente = consulta.getId_paciente();
        const idMedico = consulta.getId_medico();
        const fechaProgramada = consulta.getFecha_programada();

        if (!idPaciente || !idMedico || !fechaProgramada) {
            throw new Error("Error en la validación: id_paciente, id_medico y fecha_programada son obligatorios");
        }

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {

            // 1. Control de duplicados:
            const citaExistente = await consultaModel.findOne({
                where: {
                    id_medico: idMedico,
                    fecha_programada: fechaProgramada
                },
                transaction
            });

            if (citaExistente) {
                throw new Error("Ya existe una consulta agendada para este médico en la misma fecha y hora.");
            }

            // 2. Creación del registro
            const nuevaConsulta = await consultaModel.create({
                id_paciente: consulta.getId_paciente(),
                id_medico: consulta.getId_medico(),
                id_consultorio: consulta.getId_consultorio(),
                motivo: consulta.getMotivo(),
                observaciones: consulta.getObservaciones(),
                estado: consulta.getEstado() || "programada",
                fecha_programada: consulta.getFecha_programada(),
                fecha_realizacion: consulta.getFecha_realizacion(),
                duracion_min: consulta.getDuracion_min(),
                tarifa: consulta.getTarifa(),
                creado_en: consulta.getCreado_en()
            }, { transaction });

            await transaction.commit();

            console.log("Se guardó la consulta usando el adaptador SQL");

            return {
                estado: "ok",
                resultado: "Se guardó con éxito en la BD la consulta del paciente ID: " + idPaciente,
                id: nuevaConsulta.id_consulta
            };

        } catch (e) {

            await transaction.rollback();

            return {
                estado: "error",
                resultado: "Ocurrió un error: " + e.message
            };
        }
    }

    // UPDATE
    update = async(consulta) => {

        const id = consulta.getId_consulta();

        if (!id) {
            throw new Error("Error en la validación: Se requiere id_consulta");
        }

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {

            const consultaEncontrada = await consultaModel.findByPk(id, { transaction });

            if (!consultaEncontrada) {
                throw new Error("Consulta no encontrada");
            }

            // 2. Determinar médico y fecha objetivo (usar el nuevo dato o mantener el que ya tenía)
            const medicoObjetivo = consulta.getId_medico() ?? consultaEncontrada.id_medico;
            const fechaObjetiva = consulta.getFecha_programada() ?? consultaEncontrada.fecha_programada;

            // 3. Control de duplicados en UPDATE:
            // Busca si OTRO registro (id_consulta != id) ya ocupa al médico en ese horario
            const citaExistente = await consultaModel.findOne({
                where: {
                    id_medico: medicoObjetivo,
                    fecha_programada: fechaObjetiva,
                    id_consulta: {
                        [Op.ne]: id
                    } // Excluye la consulta que estamos editando
                },
                transaction
            });

            if (citaExistente) {
                throw new Error("Ya existe una consulta agendada para este médico en la misma fecha y hora.");
            }

            // 4. Actualización
            await consultaEncontrada.update({
                id_paciente: consulta.getId_paciente() ?? consultaEncontrada.id_paciente,
                id_medico: consulta.getId_medico() ?? consultaEncontrada.id_medico,
                id_consultorio: consulta.getId_consultorio() ?? consultaEncontrada.id_consultorio,
                motivo: consulta.getMotivo() ?? consultaEncontrada.motivo,
                observaciones: consulta.getObservaciones() ?? consultaEncontrada.observaciones,
                estado: consulta.getEstado() ?? consultaEncontrada.estado,
                fecha_programada: consulta.getFecha_programada() ?? consultaEncontrada.fecha_programada,
                fecha_realizacion: consulta.getFecha_realizacion() ?? consultaEncontrada.fecha_realizacion,
                duracion_min: consulta.getDuracion_min() ?? consultaEncontrada.duracion_min,
                tarifa: consulta.getTarifa() ?? consultaEncontrada.tarifa
            }, { transaction });

            await transaction.commit();

            console.log("Se actualizó usando el adaptador SQL");

            return {
                estado: "ok",
                resultado: "Se actualizó con éxito de la BD la consulta: " + id
            };

        } catch (e) {

            await transaction.rollback();

            return {
                estado: "error",
                resultado: "Ocurrió un error: " + e.message
            };
        }
    }

    // DELETE
    delete = async(consulta) => {

        const id = consulta.getId_consulta();

        if (!id) {
            throw new Error("Error en la validación: Se requiere id_consulta");
        }

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {

            const consultaEncontrada = await consultaModel.findByPk(id, { transaction });

            if (!consultaEncontrada) {
                throw new Error("Consulta no encontrada");
            }

            await consultaEncontrada.destroy({ transaction });

            await transaction.commit();

            console.log("Se eliminó usando el adaptador SQL");

            return {
                estado: "ok",
                resultado: "Se eliminó con éxito de la BD la consulta: " + id
            };

        } catch (e) {

            await transaction.rollback();

            return {
                estado: "error",
                resultado: "Ocurrió un error: " + e.message
            };
        }
    }
}