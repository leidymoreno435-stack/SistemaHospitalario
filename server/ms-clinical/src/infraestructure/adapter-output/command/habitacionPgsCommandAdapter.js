import habitacionCommandOutput from "../../../application/ports/output/command/habitacionCommandOutput.js";
import habitacionModel from "../../model/habitacionModel.js";

export default class habitacionPgsCommandAdapter extends habitacionCommandOutput {
    async create(dtoHabitacion) {
        return await habitacionModel.create(dtoHabitacion);
    }
    async update(id, dtoHabitacion) {
        const item = await habitacionModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoHabitacion);
    }
    async patch(id, dtoHabitacion) {
        const item = await habitacionModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoHabitacion);
    }
    async delete(id) {
        const item = await habitacionModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
