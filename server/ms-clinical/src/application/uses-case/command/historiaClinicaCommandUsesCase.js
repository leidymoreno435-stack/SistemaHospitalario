export default class historiaClinicaCommandUsesCase {
    constructor(historiaClinicaCommandOutput) {
        this.historiaClinicaCommandOutput = historiaClinicaCommandOutput;
    }
    create(dtoHistoriaClinica) { return this.historiaClinicaCommandOutput.create(dtoHistoriaClinica); }
    update(id, dtoHistoriaClinica) { return this.historiaClinicaCommandOutput.update(id, dtoHistoriaClinica); }
    patch(id, dtoHistoriaClinica) { return this.historiaClinicaCommandOutput.patch(id, dtoHistoriaClinica); }
    delete(id) { return this.historiaClinicaCommandOutput.delete(id); }
}
