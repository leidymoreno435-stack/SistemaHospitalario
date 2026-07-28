import Patient from "../../../domain/entities/patient.js";

export default class PatientCommandUseCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(patientDTO) {
        const paciente = new Patient(
            null,
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

        const result = await this.adaptadorBDSalida.create(paciente);

        console.log("Ingreso al caso de uso");

        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

    async delete(patientDTO) {
        const id = patientDTO.getId_paciente();

        const paciente = new Patient(id,null,null,null,null,null,null,null,null,null);

        const result = await this.adaptadorBDSalida.delete(paciente);

        console.log("Ingreso al caso de uso");

        return {
            estado: "ok",
            resultado: result.resultado
        };
    }
}