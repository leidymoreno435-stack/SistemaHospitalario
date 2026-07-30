import recetaCommandOutput from "../../../application/ports/output/command/recetaCommandOutput.js";
import recetaModel from "../../model/recetaModel.js";

export default class recetaPgsCommandAdapter extends recetaCommandOutput {
    async create(dtoReceta) {
        return await recetaModel.create(dtoReceta);
    }
    async update(id, dtoReceta) {
        const item = await recetaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoReceta);
    }
    async patch(id, dtoReceta) {
        const item = await recetaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoReceta);
    }
    async delete(id) {
        const item = await recetaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
