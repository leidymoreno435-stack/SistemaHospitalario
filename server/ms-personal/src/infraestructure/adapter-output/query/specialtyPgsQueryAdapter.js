import specialtyQueryOutput from "../../../application/ports/output/query/specialtyQueryOutput.js";
import specialtyModel from "../../model/specialtyModel.js";

export default class specialtyPgsQueryAdapter extends specialtyQueryOutput {
    async read() {
        return await specialtyModel.findAll();
    }
    async readById(id) {
        return await specialtyModel.findByPk(id);
    }
}
