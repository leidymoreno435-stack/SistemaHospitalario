export default class facturaCommandUsesCase {
    constructor(facturaCommandOutput) {
        this.facturaCommandOutput = facturaCommandOutput;
    }
    create(dtoFactura) { return this.facturaCommandOutput.create(dtoFactura); }
    update(id, dtoFactura) { return this.facturaCommandOutput.update(id, dtoFactura); }
    patch(id, dtoFactura) { return this.facturaCommandOutput.patch(id, dtoFactura); }
    delete(id) { return this.facturaCommandOutput.delete(id); }
}
