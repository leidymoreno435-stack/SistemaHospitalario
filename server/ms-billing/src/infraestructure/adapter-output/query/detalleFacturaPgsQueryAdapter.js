import detalleFacturaQueryOutput from "../../../application/ports/output/query/detalleFacturaQueryOutput.js";
import detalleFacturaModel from "../../model/detalleFacturaModel.js";

export default class detalleFacturaPgsQueryAdapter extends detalleFacturaQueryOutput {
    async read() {
        return await detalleFacturaModel.findAll();
    }
    async readById(id) {
        return await detalleFacturaModel.findByPk(id);
    }
}
