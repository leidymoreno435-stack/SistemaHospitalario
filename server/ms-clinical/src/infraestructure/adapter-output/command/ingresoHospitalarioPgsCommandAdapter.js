import ingresoHospitalarioCommandOutput from "../../../application/ports/output/command/ingresoHospitalarioCommandOutput.js";
import ingresoHospitalarioModel from "../../model/ingresoHospitalarioModel.js";

export default class ingresoHospitalarioPgsCommandAdapter extends ingresoHospitalarioCommandOutput {
    async create(dtoIngresoHospitalario) {
        return await ingresoHospitalarioModel.create(dtoIngresoHospitalario);
    }
    async update(id, dtoIngresoHospitalario) {
        const item = await ingresoHospitalarioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoIngresoHospitalario);
    }
    async patch(id, dtoIngresoHospitalario) {
        const item = await ingresoHospitalarioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoIngresoHospitalario);
    }
    async delete(id) {
        const item = await ingresoHospitalarioModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
