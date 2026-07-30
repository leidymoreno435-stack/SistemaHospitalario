import examenCommandOutput from "../../../application/ports/output/command/examenCommandOutput.js";
import examenModel from "../../model/examenModel.js";

export default class examenPgsCommandAdapter extends examenCommandOutput {
    async create(dtoExamen) {
        return await examenModel.create(dtoExamen);
    }
    async update(id, dtoExamen) {
        const item = await examenModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoExamen);
    }
    async patch(id, dtoExamen) {
        const item = await examenModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoExamen);
    }
    async delete(id) {
        const item = await examenModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
