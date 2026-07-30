export default class habitacionCommandUsesCase {
    constructor(habitacionCommandOutput) {
        this.habitacionCommandOutput = habitacionCommandOutput;
    }
    create(dtoHabitacion) { return this.habitacionCommandOutput.create(dtoHabitacion); }
    update(id, dtoHabitacion) { return this.habitacionCommandOutput.update(id, dtoHabitacion); }
    patch(id, dtoHabitacion) { return this.habitacionCommandOutput.patch(id, dtoHabitacion); }
    delete(id) { return this.habitacionCommandOutput.delete(id); }
}
