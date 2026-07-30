export default class servicioQueryUsesCase {
    constructor(servicioQueryOutput) {
        this.servicioQueryOutput = servicioQueryOutput;
    }
    read() { return this.servicioQueryOutput.read(); }
    readById(id) { return this.servicioQueryOutput.readById(id); }
}
