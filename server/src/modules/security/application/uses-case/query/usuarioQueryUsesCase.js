export default class usuarioQueryUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async read() {
        const filtro = [];
        const result = await this.adaptadorBDSalida.read(filtro);
        return {
            estado: "ok",
            resultado: result
        };
    }


}