import patientQueryOutput from "../../../application/ports/output/query/patientQueryOutput.js";
import patientModel from "../../model/patientModel.js";

export default class patientPgsQueryAdapter extends patientQueryOutput {
    async read() {
        return await patientModel.findAll();
    }
    async readById(id) {
        return await patientModel.findByPk(id);
    }
}
