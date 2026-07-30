export default class detalleRecetaCommandUsesCase {
    constructor(detalleRecetaCommandOutput) {
        this.detalleRecetaCommandOutput = detalleRecetaCommandOutput;
    }
    create(dtoDetalleReceta) { return this.detalleRecetaCommandOutput.create(dtoDetalleReceta); }
    update(id, dtoDetalleReceta) { return this.detalleRecetaCommandOutput.update(id, dtoDetalleReceta); }
    patch(id, dtoDetalleReceta) { return this.detalleRecetaCommandOutput.patch(id, dtoDetalleReceta); }
    delete(id) { return this.detalleRecetaCommandOutput.delete(id); }
}
