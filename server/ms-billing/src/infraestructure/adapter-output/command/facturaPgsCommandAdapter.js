import facturaCommandOutput from "../../../application/ports/output/command/facturaCommandOutput.js";
import facturaModel from "../../model/facturaModel.js";

export default class facturaPgsCommandAdapter extends facturaCommandOutput {
    async create(dtoFactura) {
        return await facturaModel.create(dtoFactura);
    }
    async update(id, dtoFactura) {
        const item = await facturaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoFactura);
    }
    async patch(id, dtoFactura) {
        const item = await facturaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoFactura);
    }
    async delete(id) {
        const item = await facturaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
