import habitacionQueryOutput from "../../../application/ports/output/query/habitacionQueryOutput.js";
import habitacionModel from "../../model/habitacionModel.js";

export default class habitacionPgsQueryAdapter extends habitacionQueryOutput {
    async read() {
        return await habitacionModel.findAll();
    }
    async readById(id) {
        return await habitacionModel.findByPk(id);
    }
}
