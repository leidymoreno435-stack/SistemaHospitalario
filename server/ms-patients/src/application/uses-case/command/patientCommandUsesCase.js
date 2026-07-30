export default class patientCommandUsesCase {
    constructor(patientCommandOutput) {
        this.patientCommandOutput = patientCommandOutput;
    }
<<<<<<< HEAD
    create(dtoPatient) { return this.patientCommandOutput.create(dtoPatient); }
    update(id, dtoPatient) { return this.patientCommandOutput.update(id, dtoPatient); }
    patch(id, dtoPatient) { return this.patientCommandOutput.patch(id, dtoPatient); }
    delete(id) { return this.patientCommandOutput.delete(id); }
}
=======

    async create(patientDTO) {
        // 1. Validación de campos obligatorios
        const nombres = patientDTO.getNombres();
        const apellidos = patientDTO.getApellidos();
        const identificacion = patientDTO.getIdentificacion();

        if (!nombres || !apellidos || !identificacion) {
            return {
                estado: "error",
                resultado: "Los campos nombres, apellidos e identificacion son obligatorios."
            };
        }

        // 2. Creación de la Entidad de Dominio
        const paciente = new Patient(
            null,
            nombres,
            apellidos,
            patientDTO.getFecha_nacimiento(),
            patientDTO.getSexo(),
            identificacion,
            patientDTO.getTelefono(),
            patientDTO.getEmail(),
            patientDTO.getDireccion(),
            patientDTO.getCreado_en()
        );

        // 3. Persistencia
        return await this.adaptadorBDSalida.create(paciente);
    }

    async update(patientDTO) {
        const id = patientDTO.getId_paciente();

        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el id_paciente para actualizar el registro."
            };
        }

        const paciente = new Patient(
            id,
            patientDTO.getNombres(),
            patientDTO.getApellidos(),
            patientDTO.getFecha_nacimiento(),
            patientDTO.getSexo(),
            patientDTO.getIdentificacion(),
            patientDTO.getTelefono(),
            patientDTO.getEmail(),
            patientDTO.getDireccion(),
            patientDTO.getCreado_en()
        );

        return await this.adaptadorBDSalida.update(paciente);
    }

    async delete(patientDTO) {
        const id = patientDTO.getId_paciente();

        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el id_paciente para eliminar el registro."
            };
        }

        const paciente = new Patient(id, null, null, null, null, null, null, null, null, null);

        return await this.adaptadorBDSalida.delete(paciente);
    }
}
>>>>>>> 0d9d72c5b2672db31ec3ec3bbb62a6ad85fcf7b6
