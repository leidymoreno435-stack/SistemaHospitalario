export default class rolQueryUsesCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async read() {
        const filter = [];
        const result = await this.adaptadorBDSalida.read(filter);
        return {
            estado: "ok",
            resultado: result
        };
    }


}