import Patient from "../../../domain/entities/patient.js";

export default class patientCommandUseCase {
    constructor(patientCommandOutput) {
        this.patientCommandOutput = patientCommandOutput;
    }

    async create(patientDTO) {
        const nombres = patientDTO.getNombres();
        const apellidos = patientDTO.getApellidos();
        const identificacion = patientDTO.getIdentificacion();

        if (!nombres || !apellidos || !identificacion) {
            return {
                estado: "error",
                resultado: "Los campos nombres, apellidos e identificacion son obligatorios."
            };
        }

        const paciente = new Patient({
            id_paciente: null,
            nombres: nombres,
            apellidos: apellidos,
            fecha_nacimiento: patientDTO.getFecha_nacimiento(),
            sexo: patientDTO.getSexo(),
            identificacion: identificacion,
            telefono: patientDTO.getTelefono(),
            email: patientDTO.getEmail(),
            direccion: patientDTO.getDireccion(),
            creado_en: patientDTO.getCreado_en()
        });

        return await this.patientCommandOutput.create(paciente);
    }

    async update(id, patientDTO) {
        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el ID para actualizar el registro."
            };
        }

        const paciente = new Patient({
            id_paciente: id,
            nombres: patientDTO.getNombres(),
            apellidos: patientDTO.getApellidos(),
            fecha_nacimiento: patientDTO.getFecha_nacimiento(),
            sexo: patientDTO.getSexo(),
            identificacion: patientDTO.getIdentificacion(),
            telefono: patientDTO.getTelefono(),
            email: patientDTO.getEmail(),
            direccion: patientDTO.getDireccion(),
            creado_en: patientDTO.getCreado_en()
        });

        return await this.patientCommandOutput.update(id, paciente);
    }

    async patch(id, patientDTO) {
        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el ID para actualizar parcialmente el registro."
            };
        }
        return await this.patientCommandOutput.patch(id, patientDTO);
    }

    async delete(id) {
        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el ID del paciente para eliminar el registro."
            };
        }

        return await this.patientCommandOutput.delete(id);
    }
}