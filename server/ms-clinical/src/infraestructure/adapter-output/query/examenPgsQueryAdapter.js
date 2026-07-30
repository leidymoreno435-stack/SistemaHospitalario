import examenQueryOutput from "../../../application/ports/output/query/examenQueryOutput.js";
import examenModel from "../../model/examenModel.js";

export default class examenPgsQueryAdapter extends examenQueryOutput {
    async read() {
        return await examenModel.findAll();
    }
    async readById(id) {
        return await examenModel.findByPk(id);
    }
}
