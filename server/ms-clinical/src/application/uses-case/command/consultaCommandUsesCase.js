import Consulta from "../../../domain/entities/consulta.js";

export default class consultaCommandUseCase {
    constructor(adaptadorBDSalida) {
        this.adaptadorBDSalida = adaptadorBDSalida;
    }

    async create(consultaDTO) {
        const consulta = new Consulta(
            null,
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

        // ✅ Retornar el resultado tal como lo entrega el adaptador (conserva estado: "error")
        return result;
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

        return result;
    }

    async delete(consultaDTO) {
        const id = consultaDTO.getId_consulta();
        const consulta = new Consulta(
            id, null, null, null, null, null, null, null, null, null, null, null
        );

        const result = await this.adaptadorBDSalida.delete(consulta);

        return result;
    }
}