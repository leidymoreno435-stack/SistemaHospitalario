import rol from "../../../domain/entities/rol.js";

export default class rolCommandUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(rolDTO) {
        const persona = new rol(null, rolDTO.getNombre(), rolDTO.getDescripcion());
        const result = await this.adaptadorBDSalida.create(persona);
        console.log("Ingreso al caso de uso");
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

    async delete(rolDTO) {
        const id = rolDTO.getId();
        const persona = new rol(id, null, null);
        const result = await this.adaptadorBDSalida.delete(persona);
        console.log("Ingreso al caso de uso");
        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

}