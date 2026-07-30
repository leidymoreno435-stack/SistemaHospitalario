export default class PatientQueryUseCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async read(filter = []) {
        const result = await this.adaptadorBDSalida.read(filter);
        return {
            estado: "ok",
            resultado: result
        };
    }
}