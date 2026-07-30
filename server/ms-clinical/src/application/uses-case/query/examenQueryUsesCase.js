export default class examenQueryUsesCase {
    constructor(examenQueryOutput) {
        this.examenQueryOutput = examenQueryOutput;
    }
    read() { return this.examenQueryOutput.read(); }
    readById(id) { return this.examenQueryOutput.readById(id); }
}
