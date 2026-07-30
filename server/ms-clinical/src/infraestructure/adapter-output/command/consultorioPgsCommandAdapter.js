import consultorioCommandOutput from "../../../application/ports/output/command/consultorioCommandOutput.js";
import consultorioModel from "../../model/consultorioModel.js";

export default class consultorioPgsCommandAdapter extends consultorioCommandOutput {
    async create(dtoConsultorio) {
        return await consultorioModel.create(dtoConsultorio);
    }
    async update(id, dtoConsultorio) {
        const item = await consultorioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoConsultorio);
    }
    async patch(id, dtoConsultorio) {
        const item = await consultorioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoConsultorio);
    }
    async delete(id) {
        const item = await consultorioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
