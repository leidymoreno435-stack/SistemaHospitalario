import consultorioQueryOutput from "../../../application/ports/output/query/consultorioQueryOutput.js";
import consultorioModel from "../../model/consultorioModel.js";

export default class consultorioPgsQueryAdapter extends consultorioQueryOutput {
    async read() {
        return await consultorioModel.findAll();
    }
    async readById(id) {
        return await consultorioModel.findByPk(id);
    }
}
