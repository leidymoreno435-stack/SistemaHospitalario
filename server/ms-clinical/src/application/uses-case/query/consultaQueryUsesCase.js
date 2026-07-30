export default class consultaQueryUsesCase {
    constructor(consultaQueryOutput) {
        this.consultaQueryOutput = consultaQueryOutput;
    }
    read() { return this.consultaQueryOutput.read(); }
    readById(id) { return this.consultaQueryOutput.readById(id); }
}
