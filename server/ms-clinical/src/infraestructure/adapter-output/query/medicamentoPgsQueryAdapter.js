import medicamentoQueryOutput from "../../../application/ports/output/query/medicamentoQueryOutput.js";
import medicamentoModel from "../../model/medicamentoModel.js";

export default class medicamentoPgsQueryAdapter extends medicamentoQueryOutput {
    async read() {
        return await medicamentoModel.findAll();
    }
    async readById(id) {
        return await medicamentoModel.findByPk(id);
    }
}
