export default class cirugiaQueryUsesCase {
    constructor(cirugiaQueryOutput) {
        this.cirugiaQueryOutput = cirugiaQueryOutput;
    }
    read() { return this.cirugiaQueryOutput.read(); }
    readById(id) { return this.cirugiaQueryOutput.readById(id); }
}
