export default class camaQueryUsesCase {
    constructor(camaQueryOutput) {
        this.camaQueryOutput = camaQueryOutput;
    }
    read() { return this.camaQueryOutput.read(); }
    readById(id) { return this.camaQueryOutput.readById(id); }
}
