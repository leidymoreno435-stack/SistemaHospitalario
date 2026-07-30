export default class recetaQueryUsesCase {
    constructor(recetaQueryOutput) {
        this.recetaQueryOutput = recetaQueryOutput;
    }
    read() { return this.recetaQueryOutput.read(); }
    readById(id) { return this.recetaQueryOutput.readById(id); }
}
