/**
 * HistoriaClinica.js — Entidad de Dominio
 *
 * Responsabilidad: Representar el registro médico histórico de un paciente.
 * Un registro puede asociarse a una consulta ambulatoria (id_consulta)
 * o a un ingreso hospitalario (id_ingreso). Ambos son opcionales.
 *
 * Patrón: Entity (DDD).
 * Principio SOLID: SRP — Encapsula únicamente la lógica de historia clínica.
 */
export default class HistoriaClinica {
    constructor(
        id,
        idPaciente,
        idConsulta,
        idIngreso,
        resumen,
        anotaciones,
        fechaRegistro
    ) {
        this.id            = id;
        this.idPaciente    = idPaciente;
        this.idConsulta    = idConsulta   || null;
        this.idIngreso     = idIngreso    || null;
        this.resumen       = resumen;
        this.anotaciones   = anotaciones  || null;
        this.fechaRegistro = fechaRegistro;
    }

    // ─── Getters ─────────────────────────────────────────────────────────────
    getId()            { return this.id; }
    getIdPaciente()    { return this.idPaciente; }
    getIdConsulta()    { return this.idConsulta; }
    getIdIngreso()     { return this.idIngreso; }
    getResumen()       { return this.resumen; }
    getAnotaciones()   { return this.anotaciones; }
    getFechaRegistro() { return this.fechaRegistro; }

    // ─── Regla de negocio ───────────────────────────────────────────────────
    /**
     * Una historia clínica es válida si tiene paciente y un resumen no vacío.
     */
    esValida() {
        return (
            this.idPaciente > 0 &&
            typeof this.resumen === 'string' &&
            this.resumen.trim().length > 0
        );
    }
}
