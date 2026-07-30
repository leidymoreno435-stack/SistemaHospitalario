export default class camaCommandUsesCase {
    constructor(camaCommandOutput) {
        this.camaCommandOutput = camaCommandOutput;
    }
    create(dtoCama) { return this.camaCommandOutput.create(dtoCama); }
    update(id, dtoCama) { return this.camaCommandOutput.update(id, dtoCama); }
    patch(id, dtoCama) { return this.camaCommandOutput.patch(id, dtoCama); }
    delete(id) { return this.camaCommandOutput.delete(id); }
}
