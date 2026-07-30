export default class Consulta {
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
}