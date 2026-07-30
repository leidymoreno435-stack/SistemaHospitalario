import recetaQueryOutput from "../../../application/ports/output/query/recetaQueryOutput.js";
import recetaModel from "../../model/recetaModel.js";

export default class recetaPgsQueryAdapter extends recetaQueryOutput {
    async read() {
        return await recetaModel.findAll();
    }
    async readById(id) {
        return await recetaModel.findByPk(id);
    }
}
