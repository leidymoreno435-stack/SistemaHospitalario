import detalleFacturaCommandOutput from "../../../application/ports/output/command/detalleFacturaCommandOutput.js";
import detalleFacturaModel from "../../model/detalleFacturaModel.js";

export default class detalleFacturaPgsCommandAdapter extends detalleFacturaCommandOutput {
    async create(dtoDetalleFactura) {
        return await detalleFacturaModel.create(dtoDetalleFactura);
    }
    async update(id, dtoDetalleFactura) {
        const item = await detalleFacturaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoDetalleFactura);
    }
    async patch(id, dtoDetalleFactura) {
        const item = await detalleFacturaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoDetalleFactura);
    }
    async delete(id) {
        const item = await detalleFacturaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
