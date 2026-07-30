<<<<<<< HEAD
export default class patientQueryUsesCase {
    constructor(patientQueryOutput) {
        this.patientQueryOutput = patientQueryOutput;
    }
    read() { return this.patientQueryOutput.read(); }
    readById(id) { return this.patientQueryOutput.readById(id); }
}
=======
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
>>>>>>> 0d9d72c5b2672db31ec3ec3bbb62a6ad85fcf7b6
