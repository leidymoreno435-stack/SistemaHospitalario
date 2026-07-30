import detalleRecetaQueryOutput from "../../../application/ports/output/query/detalleRecetaQueryOutput.js";
import detalleRecetaModel from "../../model/detalleRecetaModel.js";

export default class detalleRecetaPgsQueryAdapter extends detalleRecetaQueryOutput {
    async read() {
        return await detalleRecetaModel.findAll();
    }
    async readById(id) {
        return await detalleRecetaModel.findByPk(id);
    }
}
