import consultaQueryOutput from "../../../application/ports/output/query/consultaQueryOutput.js";
import consultaModel from "../../model/consultaModel.js";

export default class consultaPgsQueryAdapter extends consultaQueryOutput {
    async read() {
        return await consultaModel.findAll();
    }
    async readById(id) {
        return await consultaModel.findByPk(id);
    }
}
