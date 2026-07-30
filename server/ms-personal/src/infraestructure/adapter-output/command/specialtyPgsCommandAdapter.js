import specialtyCommandOutput from "../../../application/ports/output/command/specialtyCommandOutput.js";
import specialtyModel from "../../model/specialtyModel.js";

export default class specialtyPgsCommandAdapter extends specialtyCommandOutput {
    async create(dtoSpecialty) {
        return await specialtyModel.create(dtoSpecialty);
    }
    async update(id, dtoSpecialty) {
        const item = await specialtyModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoSpecialty);
    }
    async patch(id, dtoSpecialty) {
        const item = await specialtyModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoSpecialty);
    }
    async delete(id) {
        const item = await specialtyModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
