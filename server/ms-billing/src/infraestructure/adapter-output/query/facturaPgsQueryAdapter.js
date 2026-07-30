import facturaQueryOutput from "../../../application/ports/output/query/facturaQueryOutput.js";
import facturaModel from "../../model/facturaModel.js";

export default class facturaPgsQueryAdapter extends facturaQueryOutput {
    async read() {
        return await facturaModel.findAll();
    }
    async readById(id) {
        return await facturaModel.findByPk(id);
    }
}
