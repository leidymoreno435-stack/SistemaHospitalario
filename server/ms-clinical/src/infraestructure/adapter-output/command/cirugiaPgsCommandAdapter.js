import cirugiaCommandOutput from "../../../application/ports/output/command/cirugiaCommandOutput.js";
import cirugiaModel from "../../model/cirugiaModel.js";

export default class cirugiaPgsCommandAdapter extends cirugiaCommandOutput {
    async create(dtoCirugia) {
        return await cirugiaModel.create(dtoCirugia);
    }
    async update(id, dtoCirugia) {
        const item = await cirugiaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoCirugia);
    }
    async patch(id, dtoCirugia) {
        const item = await cirugiaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoCirugia);
    }
    async delete(id) {
        const item = await cirugiaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
