export default class consultaQueryUseCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async read(filter = {}) {
        const result = await this.adaptadorBDSalida.read(filter);

        console.log("Ingreso al caso de uso - Consulta (Read)");

        return {
            estado: "ok",
            resultado: result
        };
    }

    async findById(id) {
        const result = await this.adaptadorBDSalida.findById(id);

        console.log("Ingreso al caso de uso - Consulta (FindById)");

        return {
            estado: "ok",
            resultado: result
        };
    }
}