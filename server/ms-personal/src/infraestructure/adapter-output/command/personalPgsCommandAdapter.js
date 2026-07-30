import personalCommandOutput from "../../../application/ports/output/command/personalCommandOutput.js";
import personalModel from "../../model/personalModel.js";

export default class personalPgsCommandAdapter extends personalCommandOutput {
    async create(dtoPersonal) {
        return await personalModel.create(dtoPersonal);
    }
    async update(id, dtoPersonal) {
        const item = await personalModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoPersonal);
    }
    async patch(id, dtoPersonal) {
        const item = await personalModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoPersonal);
    }
    async delete(id) {
        const item = await personalModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
