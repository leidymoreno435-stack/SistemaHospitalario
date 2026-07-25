import Personal from "../../../dominio/entidades/Personal.js";
import PersonalFiltro from "../../../dominio/filtros/PersonalFiltro.js";

export default class PersonalQueryUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }
    async lista() {
        const filtros = [

        ];
        const respuesta = await this.adaptadorBDSalida.lista(filtros);
        return {
            estado: "ok",
            resultado: respuesta
        }
    }
}