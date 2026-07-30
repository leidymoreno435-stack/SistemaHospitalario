import servicioQueryOutput from "../../../application/ports/output/query/servicioQueryOutput.js";
import servicioModel from "../../model/servicioModel.js";

export default class servicioPgsQueryAdapter extends servicioQueryOutput {
    async read() {
        return await servicioModel.findAll();
    }
    async readById(id) {
        return await servicioModel.findByPk(id);
    }
}
