export default class examenCommandUsesCase {
    constructor(examenCommandOutput) {
        this.examenCommandOutput = examenCommandOutput;
    }
    create(dtoExamen) { return this.examenCommandOutput.create(dtoExamen); }
    update(id, dtoExamen) { return this.examenCommandOutput.update(id, dtoExamen); }
    patch(id, dtoExamen) { return this.examenCommandOutput.patch(id, dtoExamen); }
    delete(id) { return this.examenCommandOutput.delete(id); }
}
