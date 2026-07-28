import { Transaction } from "sequelize";
import patientCommandOutput from "../../../application/ports/output/command/patientCommandOutput.js";
import patientModel, { sequelize } from "../../base-dato/orm/patientModel.js";

export default class patientMYSQLCommandAdapter extends patientCommandOutput {

    // CREATE
    create = async (patient) => {

        const nombre = patient.getNombres();

        if (!nombre) {
            throw new Error("Error en la validación");
        }

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {

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

            console.log("Se guardó usando el adaptador SQL");

            return {
                estado: "ok",
                resultado: "Se guardó con éxito en la BD: " + nombre,
                id: nuevoPaciente.id_paciente
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
    delete = async (patient) => {

        const id = patient.getId_paciente();

        if (!id) {
            throw new Error("Error en la validación");
        }

        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {

            const pacienteEncontrado = await patientModel.findByPk(id, { transaction });

            if (!pacienteEncontrado) {
                throw new Error("Paciente no encontrado");
            }

            await pacienteEncontrado.destroy({ transaction });

            await transaction.commit();

            console.log("Se eliminó usando el adaptador SQL");

            return {
                estado: "ok",
                resultado: "Se eliminó con éxito de la BD: " + id
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