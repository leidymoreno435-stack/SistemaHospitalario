export default class consultorioCommandUsesCase {
    constructor(consultorioCommandOutput) {
        this.consultorioCommandOutput = consultorioCommandOutput;
    }
    create(dtoConsultorio) { return this.consultorioCommandOutput.create(dtoConsultorio); }
    update(id, dtoConsultorio) { return this.consultorioCommandOutput.update(id, dtoConsultorio); }
    patch(id, dtoConsultorio) { return this.consultorioCommandOutput.patch(id, dtoConsultorio); }
    delete(id) { return this.consultorioCommandOutput.delete(id); }
}
