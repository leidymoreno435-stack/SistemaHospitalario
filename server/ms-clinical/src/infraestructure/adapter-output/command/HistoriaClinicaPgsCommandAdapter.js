import historiaClinicaCommandOutput from "../../../application/ports/output/command/historiaClinicaCommandOutput.js";
import historiaClinicaModel from "../../model/historiaClinicaModel.js";

export default class historiaClinicaPgsCommandAdapter extends historiaClinicaCommandOutput {
    async create(dtoHistoriaClinica) {
        return await historiaClinicaModel.create(dtoHistoriaClinica);
    }
    async update(id, dtoHistoriaClinica) {
        const item = await historiaClinicaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoHistoriaClinica);
    }
    async patch(id, dtoHistoriaClinica) {
        const item = await historiaClinicaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoHistoriaClinica);
    }
    async delete(id) {
        const item = await historiaClinicaModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
