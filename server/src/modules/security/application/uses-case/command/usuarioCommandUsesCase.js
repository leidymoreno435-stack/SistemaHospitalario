import usuario from "../../../domain/entities/usuario.js";

export default class usuarioCommandUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(usuarioDTO) {
        const persona = new usuario(
            null,
            usuarioDTO.getUsername(),
            usuarioDTO.password_hash,
            usuarioDTO.getId_rol(),
            usuarioDTO.getActivo(),
            usuarioDTO.getFecha_creacion() || new Date()
        );
        const result = await this.adaptadorBDSalida.create(persona);
        console.log("Ingreso al caso de uso");
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

    async delete(usuarioDTO) {
        const id = usuarioDTO.getId_usuario();
        const persona = new usuario(id, null, null, null, null, null);
        const result = await this.adaptadorBDSalida.delete(persona);
        console.log("Ingreso al caso de uso");
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

}