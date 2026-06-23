import rol from "../../domain/rol.js";

export default class rolCommandUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(rolDTO) {
        const id = Date.now().toString();
        const persona = new rol(id, await rolDTO.getNombre());
        const result = await this.adaptadorBDSalida.guardar(persona);
        console.log("Ingreso al caso de uso");
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

    async delete(rolDTO) {
        const id = await rolDTO.getId();
        const persona = new rol(id, null);
        const result = await this.adaptadorBDSalida.delete(persona);
        console.log("Ingreso al caso de uso");
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

}