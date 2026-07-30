export default class consultaDTO {
    constructor(datos) {
        this.id_consulta = datos.id_consulta;
        this.id_paciente = datos.id_paciente;
        this.id_medico = datos.id_medico;
        this.id_consultorio = datos.id_consultorio;
        this.motivo = datos.motivo;
        this.observaciones = datos.observaciones;
        this.estado = datos.estado;
        this.fecha_programada = datos.fecha_programada;
        this.fecha_realizacion = datos.fecha_realizacion;
        this.duracion_min = datos.duracion_min;
        this.tarifa = datos.tarifa;
        this.creado_en = datos.creado_en;
    }
    
    getId_consulta() { return this.id_consulta; }
    getId_paciente() { return this.id_paciente; }
    getId_medico() { return this.id_medico; }
    getId_consultorio() { return this.id_consultorio; }
    getMotivo() { return this.motivo; }
    getObservaciones() { return this.observaciones; }
    getEstado() { return this.estado; }
    getFecha_programada() { return this.fecha_programada; }
    getFecha_realizacion() { return this.fecha_realizacion; }
    getDuracion_min() { return this.duracion_min; }
    getTarifa() { return this.tarifa; }
    getCreado_en() { return this.creado_en; }
    setId_consulta(id_consulta) { this.id_consulta = id_consulta; }
    setId_paciente(id_paciente) { this.id_paciente = id_paciente; }
    setId_medico(id_medico) { this.id_medico = id_medico; }
    setId_consultorio(id_consultorio) { this.id_consultorio = id_consultorio; }
    setMotivo(motivo) { this.motivo = motivo; }
    setObservaciones(observaciones) { this.observaciones = observaciones; }
    setEstado(estado) { this.estado = estado; }
    setFecha_programada(fecha_programada) { this.fecha_programada = fecha_programada; }
    setFecha_realizacion(fecha_realizacion) { this.fecha_realizacion = fecha_realizacion; }
    setDuracion_min(duracion_min) { this.duracion_min = duracion_min; }
    setTarifa(tarifa) { this.tarifa = tarifa; }
    setCreado_en(creado_en) { this.creado_en = creado_en; }
}
