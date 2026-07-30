/**
 * ConsultaDTO.js — Data Transfer Object para Consulta
 *
 * Responsabilidad: Recibir y encapsular los datos crudos del request HTTP,
 *                  exponerlos mediante getters para que los casos de uso
 *                  no accedan directamente a req.body.
 *
 * Patrón: DTO (Data Transfer Object).
 * Principio SOLID: SRP — Solo transporta datos. No valida ni persiste.
 */
export class ConsultaDTO {
    constructor(datos) {
        this.id               = datos.id_consulta;
        this.idPaciente       = datos.id_paciente;
        this.idMedico         = datos.id_medico;
        this.idConsultorio    = datos.id_consultorio   || null;
        this.motivo           = datos.motivo;
        this.observaciones    = datos.observaciones    || null;
        this.estado           = datos.estado           || 'programada';
        this.fechaProgramada  = datos.fecha_programada || null;
        this.fechaRealizacion = datos.fecha_realizacion || null;
        this.duracionMin      = datos.duracion_min     || null;
        this.tarifa           = datos.tarifa           || 0;
        this.creadoEn         = datos.creado_en        || null;
    }

    getId()               { return this.id; }
    getIdPaciente()       { return this.idPaciente; }
    getIdMedico()         { return this.idMedico; }
    getIdConsultorio()    { return this.idConsultorio; }
    getMotivo()           { return this.motivo; }
    getObservaciones()    { return this.observaciones; }
    getEstado()           { return this.estado; }
    getFechaProgramada()  { return this.fechaProgramada; }
    getFechaRealizacion() { return this.fechaRealizacion; }
    getDuracionMin()      { return this.duracionMin; }
    getTarifa()           { return this.tarifa; }
    getCreadoEn()         { return this.creadoEn; }
}
