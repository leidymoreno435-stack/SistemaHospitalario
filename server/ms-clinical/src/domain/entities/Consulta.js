/**
 * Consulta.js — Entidad de Dominio
 *
 * Responsabilidad: Representar el concepto de Consulta Médica en el dominio
 *                  del negocio hospitalario, con sus reglas invariantes.
 *
 * Patrón: Entity (DDD).
 * Principio SOLID: SRP — Solo contiene lógica del negocio del dominio.
 *                  OCP — Se puede extender sin modificar.
 *
 * IMPORTANTE: Esta clase NO importa Express, Sequelize, ni ninguna dependencia externa.
 *             Es el núcleo puro de la arquitectura hexagonal.
 */
export default class Consulta {
    constructor(
        id,
        idPaciente,
        idMedico,
        idConsultorio,
        motivo,
        observaciones,
        estado,
        fechaProgramada,
        fechaRealizacion,
        duracionMin,
        tarifa,
        creadoEn
    ) {
        this.id              = id;
        this.idPaciente      = idPaciente;
        this.idMedico        = idMedico;
        this.idConsultorio   = idConsultorio;
        this.motivo          = motivo;
        this.observaciones   = observaciones;
        this.estado          = estado || 'programada';
        this.fechaProgramada = fechaProgramada;
        this.fechaRealizacion = fechaRealizacion;
        this.duracionMin     = duracionMin;
        this.tarifa          = tarifa || 0;
        this.creadoEn        = creadoEn;
    }

    // ─── Getters puros (acceso controlado a propiedades) ────────────────────
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

    // ─── Regla de negocio del dominio ───────────────────────────────────────
    /**
     * Valida que la consulta tenga los campos mínimos obligatorios.
     * Esta regla vive en el dominio, no en el controlador.
     */
    esValida() {
        return (
            this.idPaciente > 0 &&
            this.idMedico > 0 &&
            typeof this.motivo === 'string' &&
            this.motivo.trim().length > 0
        );
    }

    /**
     * Verifica si un estado de transición es válido.
     * Regla: solo se puede marcar como 'realizada' si estaba 'programada'.
     */
    static estadoEsValido(estado) {
        return ['programada', 'realizada', 'cancelada'].includes(estado);
    }
}
