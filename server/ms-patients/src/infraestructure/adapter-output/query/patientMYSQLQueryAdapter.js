import patientQueryOutput from "../../../application/ports/output/query/patientQueryOutput.js";
import PatientFilter from "../../../domain/filters/patientFilter.js";
import patientModel from "../../base-dato/orm/patientModel.js";

export default class patientMYSQLQueryAdapter extends patientQueryOutput {

    read = async (filter = []) => {
        console.log("Listando la tabla pacientes...");
        const where = {};

        const listaFiltros = Array.isArray(filter) ? filter : [filter];

        listaFiltros.forEach(filtro => {
            if (filtro instanceof PatientFilter) {

                if (filtro.id_paciente)
                    where.id_paciente = filtro.id_paciente;

                if (filtro.nombres)
                    where.nombres = filtro.nombres;

                if (filtro.apellidos)
                    where.apellidos = filtro.apellidos;

                if (filtro.identificacion)
                    where.identificacion = filtro.identificacion;
            }
        });

        const pacientes = await patientModel.findAll({ where });

        return {
            estado: "ok",
            resultado: pacientes
        };
    };
}