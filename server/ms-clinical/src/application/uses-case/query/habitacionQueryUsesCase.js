export default class habitacionQueryUsesCase {
    constructor(habitacionQueryOutput) {
        this.habitacionQueryOutput = habitacionQueryOutput;
    }
    read() { return this.habitacionQueryOutput.read(); }
    readById(id) { return this.habitacionQueryOutput.readById(id); }
}
