export default class detalleFacturaCommandUsesCase {
    constructor(detalleFacturaCommandOutput) {
        this.detalleFacturaCommandOutput = detalleFacturaCommandOutput;
    }
    create(dtoDetalleFactura) { return this.detalleFacturaCommandOutput.create(dtoDetalleFactura); }
    update(id, dtoDetalleFactura) { return this.detalleFacturaCommandOutput.update(id, dtoDetalleFactura); }
    patch(id, dtoDetalleFactura) { return this.detalleFacturaCommandOutput.patch(id, dtoDetalleFactura); }
    delete(id) { return this.detalleFacturaCommandOutput.delete(id); }
}
