export default class quirofanoQueryUsesCase {
    constructor(quirofanoQueryOutput) {
        this.quirofanoQueryOutput = quirofanoQueryOutput;
    }
    read() { return this.quirofanoQueryOutput.read(); }
    readById(id) { return this.quirofanoQueryOutput.readById(id); }
}
