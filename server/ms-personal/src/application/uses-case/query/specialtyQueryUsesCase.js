export default class specialtyQueryUsesCase {
    constructor(specialtyQueryOutput) {
        this.specialtyQueryOutput = specialtyQueryOutput;
    }
    read() { return this.specialtyQueryOutput.read(); }
    readById(id) { return this.specialtyQueryOutput.readById(id); }
}
