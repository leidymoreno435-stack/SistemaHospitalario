import detalleRecetaCommandOutput from "../../../application/ports/output/command/detalleRecetaCommandOutput.js";
import detalleRecetaModel from "../../model/detalleRecetaModel.js";

export default class detalleRecetaPgsCommandAdapter extends detalleRecetaCommandOutput {
    async create(dtoDetalleReceta) {
        return await detalleRecetaModel.create(dtoDetalleReceta);
    }
    async update(id, dtoDetalleReceta) {
        const item = await detalleRecetaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoDetalleReceta);
    }
    async patch(id, dtoDetalleReceta) {
        const item = await detalleRecetaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoDetalleReceta);
    }
    async delete(id) {
        const item = await detalleRecetaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
