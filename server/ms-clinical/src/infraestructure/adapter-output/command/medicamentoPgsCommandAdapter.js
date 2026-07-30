import medicamentoCommandOutput from "../../../application/ports/output/command/medicamentoCommandOutput.js";
import medicamentoModel from "../../model/medicamentoModel.js";

export default class medicamentoPgsCommandAdapter extends medicamentoCommandOutput {
    async create(dtoMedicamento) {
        return await medicamentoModel.create(dtoMedicamento);
    }
    async update(id, dtoMedicamento) {
        const item = await medicamentoModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoMedicamento);
    }
    async patch(id, dtoMedicamento) {
        const item = await medicamentoModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoMedicamento);
    }
    async delete(id) {
        const item = await medicamentoModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
