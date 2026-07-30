export default class detalleRecetaQueryUsesCase {
    constructor(detalleRecetaQueryOutput) {
        this.detalleRecetaQueryOutput = detalleRecetaQueryOutput;
    }
    read() { return this.detalleRecetaQueryOutput.read(); }
    readById(id) { return this.detalleRecetaQueryOutput.readById(id); }
}
