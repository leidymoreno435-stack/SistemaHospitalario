export default class patientCommandUsesCase {
    constructor(patientCommandOutput) {
        this.patientCommandOutput = patientCommandOutput;
    }
    create(dtoPatient) { return this.patientCommandOutput.create(dtoPatient); }
    update(id, dtoPatient) { return this.patientCommandOutput.update(id, dtoPatient); }
    patch(id, dtoPatient) { return this.patientCommandOutput.patch(id, dtoPatient); }
    delete(id) { return this.patientCommandOutput.delete(id); }
}
