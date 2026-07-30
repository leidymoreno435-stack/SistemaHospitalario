import consultaCommandOutput from "../../../application/ports/output/command/consultaCommandOutput.js";
import consultaModel from "../../model/consultaModel.js";

export default class consultaPgsCommandAdapter extends consultaCommandOutput {
    async create(dtoConsulta) {
        return await consultaModel.create(dtoConsulta);
    }
    async update(id, dtoConsulta) {
        const item = await consultaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoConsulta);
    }
    async patch(id, dtoConsulta) {
        const item = await consultaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoConsulta);
    }
    async delete(id) {
        const item = await consultaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
