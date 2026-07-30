import camaQueryOutput from "../../../application/ports/output/query/camaQueryOutput.js";
import camaModel from "../../model/camaModel.js";

export default class camaPgsQueryAdapter extends camaQueryOutput {
    async read() {
        return await camaModel.findAll();
    }
    async readById(id) {
        return await camaModel.findByPk(id);
    }
}
