import servicioCommandOutput from "../../../application/ports/output/command/servicioCommandOutput.js";
import servicioModel from "../../model/servicioModel.js";

export default class servicioPgsCommandAdapter extends servicioCommandOutput {
    async create(dtoServicio) {
        return await servicioModel.create(dtoServicio);
    }
    async update(id, dtoServicio) {
        const item = await servicioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoServicio);
    }
    async patch(id, dtoServicio) {
        const item = await servicioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoServicio);
    }
    async delete(id) {
        const item = await servicioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
