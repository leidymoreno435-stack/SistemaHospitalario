export default class Examen {
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
}
