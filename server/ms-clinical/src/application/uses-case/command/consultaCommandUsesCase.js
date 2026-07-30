export default class consultaCommandUsesCase {
    constructor(consultaCommandOutput) {
        this.consultaCommandOutput = consultaCommandOutput;
    }
    create(dtoConsulta) { return this.consultaCommandOutput.create(dtoConsulta); }
    update(id, dtoConsulta) { return this.consultaCommandOutput.update(id, dtoConsulta); }
    patch(id, dtoConsulta) { return this.consultaCommandOutput.patch(id, dtoConsulta); }
    delete(id) { return this.consultaCommandOutput.delete(id); }
}
