import specialtyQueryOutput from "../../../application/ports/output/query/specialtyQueryOutput.js";
import SpecialtyFilter from "../../../domain/filters/specialtyFilter.js";
import specialtyModel from "../../model/specialtyModel.js";

export default class specialtyMYSQLQueryAdapter extends specialtyQueryOutput {

    read = async (filter = []) => {
        console.log("Listando la tabla especialidad...");
        const where = {};

        const listaFiltros = Array.isArray(filter) ? filter : [filter];

        listaFiltros.forEach(filtro => {
            if (filtro instanceof SpecialtyFilter) {

                if (filtro.id_especialidad)
                    where.id_especialidad = filtro.id_especialidad;

                if (filtro.nombre)
                    where.nombre = filtro.nombre;

                if (filtro.descripcion)
                    where.descripcion = filtro.descripcion;
            }
        });

        const especialidades = await specialtyModel.findAll({ where });

        return {
            estado: "ok",
            resultado: especialidades
        };
    };
}