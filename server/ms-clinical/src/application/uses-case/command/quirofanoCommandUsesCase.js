export default class quirofanoCommandUsesCase {
    constructor(quirofanoCommandOutput) {
        this.quirofanoCommandOutput = quirofanoCommandOutput;
    }
    create(dtoQuirofano) { return this.quirofanoCommandOutput.create(dtoQuirofano); }
    update(id, dtoQuirofano) { return this.quirofanoCommandOutput.update(id, dtoQuirofano); }
    patch(id, dtoQuirofano) { return this.quirofanoCommandOutput.patch(id, dtoQuirofano); }
    delete(id) { return this.quirofanoCommandOutput.delete(id); }
}
