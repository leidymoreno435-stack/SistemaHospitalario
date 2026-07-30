import patientQueryOutput from "../../../application/ports/output/query/patientQueryOutput.js";
import PatientFilter from "../../../domain/filters/patientFilter.js";
import PatientModel from "../../model/patientModel.js";

export default class patientMYSQLQueryAdapter extends patientQueryOutput {

    read = async (filter = []) => {
        console.log("Listando la tabla paciente...");
        const where = {};
        filter.forEach(filtro => {
            if (filtro instanceof PatientFilter) {

                if (filtro.nombres)
                    where.nombres = filtro.nombres;

                if (filtro.apellidos)
                    where.apellidos = filtro.apellidos;

                if (filtro.identificacion)
                    where.identificacion = filtro.identificacion;

                if (filtro.sexo)
                    where.sexo = filtro.sexo;
            }
        });

        const pacientes = await PatientModel.findAll({ where });
        return {
            estado: "ok",
            resultado: pacientes
        };
    };
}