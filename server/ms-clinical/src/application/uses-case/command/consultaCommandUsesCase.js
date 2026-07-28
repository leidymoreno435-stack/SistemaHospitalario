import Consulta from "../../../domain/entities/consulta.js";

export default class consultaCommandUseCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(consultaDTO) {
        const consulta = new Consulta(
            null, // El ID se autonumera en la BD
            consultaDTO.getId_paciente(),
            consultaDTO.getId_medico(),
            consultaDTO.getId_consultorio(),
            consultaDTO.getMotivo(),
            consultaDTO.getObservaciones(),
            consultaDTO.getEstado(),
            consultaDTO.getFecha_programada(),
            consultaDTO.getFecha_realizacion(),
            consultaDTO.getDuracion_min(),
            consultaDTO.getTarifa(),
            consultaDTO.getCreado_en()
        );

        const result = await this.adaptadorBDSalida.create(consulta);

        console.log("Ingreso al caso de uso - Consulta (Create)");

        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

    async update(consultaDTO) {
        const consulta = new Consulta(
            consultaDTO.getId_consulta(),
            consultaDTO.getId_paciente(),
            consultaDTO.getId_medico(),
            consultaDTO.getId_consultorio(),
            consultaDTO.getMotivo(),
            consultaDTO.getObservaciones(),
            consultaDTO.getEstado(),
            consultaDTO.getFecha_programada(),
            consultaDTO.getFecha_realizacion(),
            consultaDTO.getDuracion_min(),
            consultaDTO.getTarifa(),
            consultaDTO.getCreado_en()
        );

        const result = await this.adaptadorBDSalida.update(consulta);

        console.log("Ingreso al caso de uso - Consulta (Update)");

        return {
            estado: "ok",
            resultado: result.resultado
        };
    }

    async delete(consultaDTO) {
        const id = consultaDTO.getId_consulta();

        // Se pasa la entidad con el ID a eliminar y el resto de campos nulos
        const consulta = new Consulta(
            id,
            null, null, null, null, null, null, null, null, null, null, null
        );

        const result = await this.adaptadorBDSalida.delete(consulta);

        console.log("Ingreso al caso de uso - Consulta (Delete)");

        return {
            estado: "ok",
            resultado: result.resultado
        };
    }
}