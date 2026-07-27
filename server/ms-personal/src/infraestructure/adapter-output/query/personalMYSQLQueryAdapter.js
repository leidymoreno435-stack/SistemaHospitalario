import personalQueryOutput from "../../../application/ports/output/query/personalQueryOutput.js";
import PersonalFilter from "../../../domain/filters/personalFilter.js";
import PersonalModel from '../../base-dato/orm/personalModel.js'

export default class personalMYSQLQueryAdapter extends personalQueryOutput {
    read = async(filter = []) => {
        console.log('Listando la tabla persnal..')
        const where = {};
        filter.forEach(esp => {
            if (esp instanceof PersonalFilter) {
                if (esp.nombres)
                    where.nombres = esp.nombres
            }
        });

        const personal = await PersonalModel.findAll({ where });
        return {
            estado: "ok",
            resultado: personal
        }
    }
}