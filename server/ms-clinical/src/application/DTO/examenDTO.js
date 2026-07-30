export default class examenDTO {
    constructor(datos) {
        this.id_examen = datos.id_examen;
        this.id_paciente = datos.id_paciente;
        this.id_solicitante = datos.id_solicitante;
        this.tipo_examen = datos.tipo_examen;
        this.fecha_orden = datos.fecha_orden;
        this.fecha_resultado = datos.fecha_resultado;
        this.resultado = datos.resultado;
        this.adjunto_ruta = datos.adjunto_ruta;
        this.estado = datos.estado;
    }
    
    getId_examen() { return this.id_examen; }
    getId_paciente() { return this.id_paciente; }
    getId_solicitante() { return this.id_solicitante; }
    getTipo_examen() { return this.tipo_examen; }
    getFecha_orden() { return this.fecha_orden; }
    getFecha_resultado() { return this.fecha_resultado; }
    getResultado() { return this.resultado; }
    getAdjunto_ruta() { return this.adjunto_ruta; }
    getEstado() { return this.estado; }
    setId_examen(id_examen) { this.id_examen = id_examen; }
    setId_paciente(id_paciente) { this.id_paciente = id_paciente; }
    setId_solicitante(id_solicitante) { this.id_solicitante = id_solicitante; }
    setTipo_examen(tipo_examen) { this.tipo_examen = tipo_examen; }
    setFecha_orden(fecha_orden) { this.fecha_orden = fecha_orden; }
    setFecha_resultado(fecha_resultado) { this.fecha_resultado = fecha_resultado; }
    setResultado(resultado) { this.resultado = resultado; }
    setAdjunto_ruta(adjunto_ruta) { this.adjunto_ruta = adjunto_ruta; }
    setEstado(estado) { this.estado = estado; }
}
