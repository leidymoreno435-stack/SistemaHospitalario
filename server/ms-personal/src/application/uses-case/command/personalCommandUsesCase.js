import personal from "../../../domain/entities/personal.js";

export default class personalCommandUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }
    async create(personalDTO) {
        const persona = new personal(
            null,
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
        const result = await this.adaptadorBDSalida.create(persona);
        console.log('Ingreso al caso de uso');
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }
    async delete(personalDTO) {
        const id = personalDTO.getId_personal();
        const persona = new personal(id, null, null, null, null, null, null, null, null, null)
        const result = await this.adaptadorBDSalida.delete(persona);
        console.log('Ingreso al caso de uso');
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }
}