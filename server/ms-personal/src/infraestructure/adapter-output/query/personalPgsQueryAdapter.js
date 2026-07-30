import personalQueryOutput from "../../../application/ports/output/query/personalQueryOutput.js";
import personalModel from "../../model/personalModel.js";

export default class personalPgsQueryAdapter extends personalQueryOutput {
    async read() {
        return await personalModel.findAll();
    }
    async readById(id) {
        return await personalModel.findByPk(id);
    }
}
