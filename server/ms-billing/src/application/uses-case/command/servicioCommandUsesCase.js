export default class servicioCommandUsesCase {
    constructor(servicioCommandOutput) {
        this.servicioCommandOutput = servicioCommandOutput;
    }
    create(dtoServicio) { return this.servicioCommandOutput.create(dtoServicio); }
    update(id, dtoServicio) { return this.servicioCommandOutput.update(id, dtoServicio); }
    patch(id, dtoServicio) { return this.servicioCommandOutput.patch(id, dtoServicio); }
    delete(id) { return this.servicioCommandOutput.delete(id); }
}
