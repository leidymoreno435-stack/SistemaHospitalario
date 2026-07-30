export default class specialtyCommandUsesCase {
    constructor(specialtyCommandOutput) {
        this.specialtyCommandOutput = specialtyCommandOutput;
    }
    create(dtoSpecialty) { return this.specialtyCommandOutput.create(dtoSpecialty); }
    update(id, dtoSpecialty) { return this.specialtyCommandOutput.update(id, dtoSpecialty); }
    patch(id, dtoSpecialty) { return this.specialtyCommandOutput.patch(id, dtoSpecialty); }
    delete(id) { return this.specialtyCommandOutput.delete(id); }
}
