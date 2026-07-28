import consultaQueryOutput from "../../../application/ports/output/query/consultaQueryOutput.js";
import ConsultaFilter from "../../../domain/entities/consultaFilter.js";
import consultaModel from "../../base-dato/orm/consultaModel.js";

export default class consultaMYSQLQueryAdapter extends consultaQueryOutput {

    read = async (filter = []) => {
        console.log("Listando la tabla consulta...");
        const where = {};

        const listaFiltros = Array.isArray(filter) ? filter : [filter];

        listaFiltros.forEach(filtro => {
            if (filtro instanceof ConsultaFilter) {

                if (filtro.id_paciente)
                    where.id_paciente = filtro.id_paciente;

                if (filtro.id_medico)
                    where.id_medico = filtro.id_medico;

                if (filtro.id_consultorio)
                    where.id_consultorio = filtro.id_consultorio;

                if (filtro.estado)
                    where.estado = filtro.estado;

                if (filtro.fecha_programada)
                    where.fecha_programada = filtro.fecha_programada;
            }
        });

        const consultas = await consultaModel.findAll({ where });

        return {
            estado: "ok",
            resultado: consultas
        };
    };
}