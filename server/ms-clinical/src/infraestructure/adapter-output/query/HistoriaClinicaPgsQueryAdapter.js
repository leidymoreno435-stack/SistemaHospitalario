import historiaClinicaQueryOutput from "../../../application/ports/output/query/historiaClinicaQueryOutput.js";
import historiaClinicaModel from "../../model/historiaClinicaModel.js";

export default class historiaClinicaPgsQueryAdapter extends historiaClinicaQueryOutput {
    async read() {
        return await historiaClinicaModel.findAll();
    }
    async readById(id) {
        return await historiaClinicaModel.findByPk(id);
    }
}
