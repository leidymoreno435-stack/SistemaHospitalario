import quirofanoCommandOutput from "../../../application/ports/output/command/quirofanoCommandOutput.js";
import quirofanoModel from "../../model/quirofanoModel.js";

export default class quirofanoPgsCommandAdapter extends quirofanoCommandOutput {
    async create(dtoQuirofano) {
        return await quirofanoModel.create(dtoQuirofano);
    }
    async update(id, dtoQuirofano) {
        const item = await quirofanoModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoQuirofano);
    }
    async patch(id, dtoQuirofano) {
        const item = await quirofanoModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoQuirofano);
    }
    async delete(id) {
        const item = await quirofanoModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
