export default class personalCommandUsesCase {
    constructor(personalCommandOutput) {
        this.personalCommandOutput = personalCommandOutput;
    }
    create(dtoPersonal) { return this.personalCommandOutput.create(dtoPersonal); }
    update(id, dtoPersonal) { return this.personalCommandOutput.update(id, dtoPersonal); }
    patch(id, dtoPersonal) { return this.personalCommandOutput.patch(id, dtoPersonal); }
    delete(id) { return this.personalCommandOutput.delete(id); }
}
