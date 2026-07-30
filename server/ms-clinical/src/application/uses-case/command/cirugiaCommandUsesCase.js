export default class cirugiaCommandUsesCase {
    constructor(cirugiaCommandOutput) {
        this.cirugiaCommandOutput = cirugiaCommandOutput;
    }
    create(dtoCirugia) { return this.cirugiaCommandOutput.create(dtoCirugia); }
    update(id, dtoCirugia) { return this.cirugiaCommandOutput.update(id, dtoCirugia); }
    patch(id, dtoCirugia) { return this.cirugiaCommandOutput.patch(id, dtoCirugia); }
    delete(id) { return this.cirugiaCommandOutput.delete(id); }
}
