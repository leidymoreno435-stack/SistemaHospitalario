import personalQueryOutput from "../../../application/ports/output/query/personalQueryOutput.js";
import PersonalFilter from "../../../domain/filters/personalFilter.js";
import personalModel from "../../model/personalModel.js";

export default class personalMYSQLQueryAdapter extends personalQueryOutput {

    read = async (filter = []) => {
        console.log("Listando la tabla personal...");
        const where = {};

        const listaFiltros = Array.isArray(filter) ? filter : [filter];

        listaFiltros.forEach(filtro => {
            if (filtro instanceof PersonalFilter) {

                if (filtro.id_personal)
                    where.id_personal = filtro.id_personal;

                if (filtro.nombres)
                    where.nombres = filtro.nombres;

                if (filtro.apellidos)
                    where.apellidos = filtro.apellidos;

                if (filtro.identificacion)
                    where.identificacion = filtro.identificacion;

                if (filtro.id_especialidad)
                    where.id_especialidad = filtro.id_especialidad;

                if (filtro.activo !== undefined && filtro.activo !== null)
                    where.activo = filtro.activo;
            }
        });

        const personal = await personalModel.findAll({ where });

        return {
            estado: "ok",
            resultado: personal
        };
    };
}