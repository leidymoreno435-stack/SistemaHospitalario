export default class facturaQueryUsesCase {
    constructor(facturaQueryOutput) {
        this.facturaQueryOutput = facturaQueryOutput;
    }
    read() { return this.facturaQueryOutput.read(); }
    readById(id) { return this.facturaQueryOutput.readById(id); }
}
