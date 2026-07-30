import camaCommandOutput from "../../../application/ports/output/command/camaCommandOutput.js";
import camaModel from "../../model/camaModel.js";

export default class camaPgsCommandAdapter extends camaCommandOutput {
    async create(dtoCama) {
        return await camaModel.create(dtoCama);
    }
    async update(id, dtoCama) {
        const item = await camaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoCama);
    }
    async patch(id, dtoCama) {
        const item = await camaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoCama);
    }
    async delete(id) {
        const item = await camaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
