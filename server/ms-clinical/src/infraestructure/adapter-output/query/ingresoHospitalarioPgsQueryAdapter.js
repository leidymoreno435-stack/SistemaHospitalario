import ingresoHospitalarioQueryOutput from "../../../application/ports/output/query/ingresoHospitalarioQueryOutput.js";
import ingresoHospitalarioModel from "../../model/ingresoHospitalarioModel.js";

export default class ingresoHospitalarioPgsQueryAdapter extends ingresoHospitalarioQueryOutput {
    async read() {
        return await ingresoHospitalarioModel.findAll();
    }
    async readById(id) {
        return await ingresoHospitalarioModel.findByPk(id);
    }
}
