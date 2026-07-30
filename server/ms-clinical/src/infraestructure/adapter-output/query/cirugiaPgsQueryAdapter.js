import cirugiaQueryOutput from "../../../application/ports/output/query/cirugiaQueryOutput.js";
import cirugiaModel from "../../model/cirugiaModel.js";

export default class cirugiaPgsQueryAdapter extends cirugiaQueryOutput {
    async read() {
        return await cirugiaModel.findAll();
    }
    async readById(id) {
        return await cirugiaModel.findByPk(id);
    }
}
