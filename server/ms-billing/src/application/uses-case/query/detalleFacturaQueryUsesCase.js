export default class detalleFacturaQueryUsesCase {
    constructor(detalleFacturaQueryOutput) {
        this.detalleFacturaQueryOutput = detalleFacturaQueryOutput;
    }
    read() { return this.detalleFacturaQueryOutput.read(); }
    readById(id) { return this.detalleFacturaQueryOutput.readById(id); }
}
