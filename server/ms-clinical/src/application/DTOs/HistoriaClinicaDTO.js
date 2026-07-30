/**
 * HistoriaClinicaDTO.js — Data Transfer Object para HistoriaClinica
 *
 * Responsabilidad: Encapsular datos crudos del request para historia_clinica.
 * Patrón: DTO.
 */
export class HistoriaClinicaDTO {
    constructor(datos) {
        this.id            = datos.id_historia;
        this.idPaciente    = datos.id_paciente;
        this.idConsulta    = datos.id_consulta  || null;
        this.idIngreso     = datos.id_ingreso   || null;
        this.resumen       = datos.resumen;
        this.anotaciones   = datos.anotaciones  || null;
        this.fechaRegistro = datos.fecha_registro || null;
    }

    getId()            { return this.id; }
    getIdPaciente()    { return this.idPaciente; }
    getIdConsulta()    { return this.idConsulta; }
    getIdIngreso()     { return this.idIngreso; }
    getResumen()       { return this.resumen; }
    getAnotaciones()   { return this.anotaciones; }
    getFechaRegistro() { return this.fechaRegistro; }
}
