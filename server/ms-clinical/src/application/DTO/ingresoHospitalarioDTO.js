export default class ingresoHospitalarioDTO {
    constructor(datos) {
        this.id_ingreso = datos.id_ingreso;
        this.id_paciente = datos.id_paciente;
        this.id_cama = datos.id_cama;
        this.id_medico_responsable = datos.id_medico_responsable;
        this.fecha_ingreso = datos.fecha_ingreso;
        this.fecha_alta = datos.fecha_alta;
        this.motivo_ingreso = datos.motivo_ingreso;
        this.estado = datos.estado;
    }
    
    getId_ingreso() { return this.id_ingreso; }
    getId_paciente() { return this.id_paciente; }
    getId_cama() { return this.id_cama; }
    getId_medico_responsable() { return this.id_medico_responsable; }
    getFecha_ingreso() { return this.fecha_ingreso; }
    getFecha_alta() { return this.fecha_alta; }
    getMotivo_ingreso() { return this.motivo_ingreso; }
    getEstado() { return this.estado; }
    setId_ingreso(id_ingreso) { this.id_ingreso = id_ingreso; }
    setId_paciente(id_paciente) { this.id_paciente = id_paciente; }
    setId_cama(id_cama) { this.id_cama = id_cama; }
    setId_medico_responsable(id_medico_responsable) { this.id_medico_responsable = id_medico_responsable; }
    setFecha_ingreso(fecha_ingreso) { this.fecha_ingreso = fecha_ingreso; }
    setFecha_alta(fecha_alta) { this.fecha_alta = fecha_alta; }
    setMotivo_ingreso(motivo_ingreso) { this.motivo_ingreso = motivo_ingreso; }
    setEstado(estado) { this.estado = estado; }
}
