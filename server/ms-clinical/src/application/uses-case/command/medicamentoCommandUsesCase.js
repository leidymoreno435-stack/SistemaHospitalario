export default class medicamentoCommandUsesCase {
    constructor(medicamentoCommandOutput) {
        this.medicamentoCommandOutput = medicamentoCommandOutput;
    }
    create(dtoMedicamento) { return this.medicamentoCommandOutput.create(dtoMedicamento); }
    update(id, dtoMedicamento) { return this.medicamentoCommandOutput.update(id, dtoMedicamento); }
    patch(id, dtoMedicamento) { return this.medicamentoCommandOutput.patch(id, dtoMedicamento); }
    delete(id) { return this.medicamentoCommandOutput.delete(id); }
}
