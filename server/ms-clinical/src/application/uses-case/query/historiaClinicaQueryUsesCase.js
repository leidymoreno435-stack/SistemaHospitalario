export default class historiaClinicaQueryUsesCase {
    constructor(historiaClinicaQueryOutput) {
        this.historiaClinicaQueryOutput = historiaClinicaQueryOutput;
    }
    read() { return this.historiaClinicaQueryOutput.read(); }
    readById(id) { return this.historiaClinicaQueryOutput.readById(id); }
}
