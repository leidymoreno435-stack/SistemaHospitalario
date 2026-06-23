import usuario from "../../domain/usuario.js";

export default class usuarioCommandUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(usuarioDTO) {
        const id = Date.now().toString();
        const persona = new usuario(id, await usuarioDTO.getNombre());
        const result = await this.adaptadorBDSalida.guardar(persona);
        console.log("Ingreso al caso de uso");
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

    async delete(usuarioDTO) {
        const id = await usuarioDTO.getId();
        const persona = new usuario(id, null);
        const result = await this.adaptadorBDSalida.eliminar(persona);
        console.log("Ingreso al caso de uso");
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

}