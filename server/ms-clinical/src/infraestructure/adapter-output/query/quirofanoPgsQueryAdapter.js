import quirofanoQueryOutput from "../../../application/ports/output/query/quirofanoQueryOutput.js";
import quirofanoModel from "../../model/quirofanoModel.js";

export default class quirofanoPgsQueryAdapter extends quirofanoQueryOutput {
    async read() {
        return await quirofanoModel.findAll();
    }
    async readById(id) {
        return await quirofanoModel.findByPk(id);
    }
}
