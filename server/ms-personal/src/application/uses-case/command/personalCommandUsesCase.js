import Personal from "../../../domain/entities/personal.js";

export default class PersonalCommandUseCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(personalDTO) {
        // 1. Validación de campos obligatorios
        const nombres = personalDTO.getNombres();
        const apellidos = personalDTO.getApellidos();
        const identificacion = personalDTO.getIdentificacion();

        if (!nombres || !apellidos || !identificacion) {
            return {
                estado: "error",
                resultado: "Los campos nombres, apellidos e identificación son obligatorios."
            };
        }

        // 2. Creación de la Entidad de Dominio
        const personal = new Personal(
            null,
            nombres,
            apellidos,
            identificacion,
            personalDTO.getId_usuario(),
            personalDTO.getId_especialidad(),
            personalDTO.getTelefono(),
            personalDTO.getEmail(),
            personalDTO.getActivo() ?? true,
            personalDTO.getCreado_en()
        );

        // 3. Persistencia
        return await this.adaptadorBDSalida.create(personal);
    }

    async update(personalDTO) {
        const id = personalDTO.getId_personal();

        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el id_personal para actualizar el registro."
            };
        }

        const personal = new Personal(
            id,
            personalDTO.getNombres(),
            personalDTO.getApellidos(),
            personalDTO.getIdentificacion(),
            personalDTO.getId_usuario(),
            personalDTO.getId_especialidad(),
            personalDTO.getTelefono(),
            personalDTO.getEmail(),
            personalDTO.getActivo(),
            personalDTO.getCreado_en()
        );

        return await this.adaptadorBDSalida.update(personal);
    }

    async delete(personalDTO) {
        const id = personalDTO.getId_personal();

        if (!id) {
            return {
                estado: "error",
                resultado: "Se requiere el id_personal para eliminar el registro."
            };
        }

        const personal = new Personal(id, null, null, null, null, null, null, null, null, null);

        return await this.adaptadorBDSalida.delete(personal);
    }
}