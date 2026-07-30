export default class medicamentoQueryUsesCase {
    constructor(medicamentoQueryOutput) {
        this.medicamentoQueryOutput = medicamentoQueryOutput;
    }
    read() { return this.medicamentoQueryOutput.read(); }
    readById(id) { return this.medicamentoQueryOutput.readById(id); }
}
