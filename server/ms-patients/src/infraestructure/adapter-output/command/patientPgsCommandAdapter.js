import patientCommandOutput from "../../../application/ports/output/command/patientCommandOutput.js";
import patientModel from "../../model/patientModel.js";

export default class patientPgsCommandAdapter extends patientCommandOutput {
    async create(patientEntity) {
        // Convierte la entidad/instancia a objeto plano para Sequelize/ORMs
        const data = {
            ...patientEntity
        };

        // Elimina id_paciente si es null para que Sequelize lo genere automáticamente
        if (data.id_paciente === null || data.id_paciente === undefined) {
            delete data.id_paciente;
        }

        // Elimina creado_en si es null para que la base de datos lo genere automáticamente
        if (data.creado_en === null || data.creado_en === undefined) {
            delete data.creado_en;
        }

        return await patientModel.create(data);
    }

    async update(id, patientEntity) {
        const item = await patientModel.findByPk(id);
        if (!item) throw new Error("Paciente no encontrado");

        const data = {
            ...patientEntity
        };
        return await item.update(data);
    }

    async patch(id, patientDTO) {
        const item = await patientModel.findByPk(id);
        if (!item) throw new Error("Paciente no encontrado");

        // Limpia las propiedades 'undefined' para actualizar solo los campos enviados
        const dataToUpdate = {
            ...patientDTO
        };
        Object.keys(dataToUpdate).forEach(
            (key) => dataToUpdate[key] === undefined && delete dataToUpdate[key]
        );

        return await item.update(dataToUpdate);
    }

    async delete(id) {
        const item = await patientModel.findByPk(id);
        if (!item) throw new Error("Paciente no encontrado");
        return await item.destroy();
    }
}