import { Transaction, Op } from "sequelize";
import patientCommandOutput from "../../../application/ports/output/command/patientCommandOutput.js";
import patientModel, { sequelize } from '../../base-dato/orm/patientModel.js';

export default class patientMYSQLCommandAdapter extends patientCommandOutput {

    /* CREATE */
    create = async (patient) => {
        const identificacion = patient.getIdentificacion();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            // Control de duplicados por identificación de paciente
            if (identificacion) {
                const existe = await patientModel.findOne({
                    where: { identificacion },
                    transaction
                });
                if (existe) {
                    throw new Error("Ya existe un paciente registrado con esta identificación.");
                }
            }

            const nuevoPaciente = await patientModel.create({
                nombres: patient.getNombres(),
                apellidos: patient.getApellidos(),
                fecha_nacimiento: patient.getFecha_nacimiento(),
                sexo: patient.getSexo(),
                identificacion: patient.getIdentificacion(),
                telefono: patient.getTelefono(),
                email: patient.getEmail(),
                direccion: patient.getDireccion(),
                creado_en: patient.getCreado_en()
            }, { transaction });

            await transaction.commit();
            console.log('Se guardó el paciente usando el adaptador SQL');

            return {
                estado: "ok",
                resultado: `Se guardó con éxito en la BD: ${patient.getNombres()} ${patient.getApellidos()}`,
                id: nuevoPaciente.id_paciente
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: e.message || "Ocurrió un error al crear el paciente"
            };
        }
    };

    /* UPDATE */
    update = async (patient) => {
        const id = patient.getId_paciente();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            if (!id) {
                throw new Error("Se requiere un ID de paciente válido para actualizar.");
            }

            const pacienteEncontrado = await patientModel.findByPk(id, { transaction });
            if (!pacienteEncontrado) {
                throw new Error("Paciente no encontrado");
            }

            // Control de duplicados si se modifica la identificación
            const nuevaIdentificacion = patient.getIdentificacion();
            if (nuevaIdentificacion && nuevaIdentificacion !== pacienteEncontrado.identificacion) {
                const duplicado = await patientModel.findOne({
                    where: {
                        identificacion: nuevaIdentificacion,
                        id_paciente: { [Op.ne]: id }
                    },
                    transaction
                });
                if (duplicado) {
                    throw new Error("Ya existe otro paciente registrado con esta identificación.");
                }
            }

            // Actualización preservando valores no enviados (Coalescencia)
            await pacienteEncontrado.update({
                nombres: patient.getNombres() ?? pacienteEncontrado.nombres,
                apellidos: patient.getApellidos() ?? pacienteEncontrado.apellidos,
                fecha_nacimiento: patient.getFecha_nacimiento() ?? pacienteEncontrado.fecha_nacimiento,
                sexo: patient.getSexo() ?? pacienteEncontrado.sexo,
                identificacion: patient.getIdentificacion() ?? pacienteEncontrado.identificacion,
                telefono: patient.getTelefono() ?? pacienteEncontrado.telefono,
                email: patient.getEmail() ?? pacienteEncontrado.email,
                direccion: patient.getDireccion() ?? pacienteEncontrado.direccion
            }, { transaction });

            await transaction.commit();
            console.log('Se actualizó el paciente usando el adaptador SQL');

            return {
                estado: "ok",
                resultado: `Se actualizó con éxito el paciente con ID: ${id}`
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: e.message || "Ocurrió un error al actualizar el paciente"
            };
        }
    };

    /* DELETE */
    delete = async (patient) => {
        const id = patient.getId_paciente();

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            if (!id) {
                throw new Error("Se requiere un ID de paciente válido para eliminar.");
            }

            const pacienteEncontrado = await patientModel.findByPk(id, { transaction });
            if (!pacienteEncontrado) {
                throw new Error("Paciente no encontrado");
            }

            await pacienteEncontrado.destroy({ transaction });
            await transaction.commit();
            console.log('Se eliminó el paciente usando el adaptador SQL');

            return {
                estado: "ok",
                resultado: `Se eliminó con éxito en la BD el ID: ${id}`
            };
        } catch (e) {
            await transaction.rollback();
            return {
                estado: "error",
                resultado: e.message || "Ocurrió un error al eliminar el paciente"
            };
        }
    };
}