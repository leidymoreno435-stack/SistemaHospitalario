export default class ingresoHospitalarioQueryUsesCase {
    constructor(ingresoHospitalarioQueryOutput) {
        this.ingresoHospitalarioQueryOutput = ingresoHospitalarioQueryOutput;
    }
    read() { return this.ingresoHospitalarioQueryOutput.read(); }
    readById(id) { return this.ingresoHospitalarioQueryOutput.readById(id); }
}
