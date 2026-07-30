export default class recetaCommandUsesCase {
    constructor(recetaCommandOutput) {
        this.recetaCommandOutput = recetaCommandOutput;
    }
    create(dtoReceta) { return this.recetaCommandOutput.create(dtoReceta); }
    update(id, dtoReceta) { return this.recetaCommandOutput.update(id, dtoReceta); }
    patch(id, dtoReceta) { return this.recetaCommandOutput.patch(id, dtoReceta); }
    delete(id) { return this.recetaCommandOutput.delete(id); }
}
