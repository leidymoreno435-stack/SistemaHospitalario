export default class patientQueryUsesCase {
    constructor(patientQueryOutput) {
        this.patientQueryOutput = patientQueryOutput;
    }
    read() { return this.patientQueryOutput.read(); }
    readById(id) { return this.patientQueryOutput.readById(id); }
}
