export default class personalQueryUsesCase {
    constructor(personalQueryOutput) {
        this.personalQueryOutput = personalQueryOutput;
    }
    read() { return this.personalQueryOutput.read(); }
    readById(id) { return this.personalQueryOutput.readById(id); }
}
