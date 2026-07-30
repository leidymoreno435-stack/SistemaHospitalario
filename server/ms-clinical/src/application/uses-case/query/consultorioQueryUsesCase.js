export default class consultorioQueryUsesCase {
    constructor(consultorioQueryOutput) {
        this.consultorioQueryOutput = consultorioQueryOutput;
    }
    read() { return this.consultorioQueryOutput.read(); }
    readById(id) { return this.consultorioQueryOutput.readById(id); }
}
