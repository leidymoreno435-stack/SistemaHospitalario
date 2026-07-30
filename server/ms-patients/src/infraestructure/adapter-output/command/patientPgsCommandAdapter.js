import patientCommandOutput from "../../../application/ports/output/command/patientCommandOutput.js";
import patientModel from "../../model/patientModel.js";

export default class patientPgsCommandAdapter extends patientCommandOutput {
    async create(dtoPatient) {
        return await patientModel.create(dtoPatient);
    }
    async update(id, dtoPatient) {
        const item = await patientModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoPatient);
    }
    async patch(id, dtoPatient) {
        const item = await patientModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.update(dtoPatient);
    }
    async delete(id) {
        const item = await patientModel.findByPk(id);
        if(!item) throw new Error("No encontrado");
        return await item.destroy();
    }
}
