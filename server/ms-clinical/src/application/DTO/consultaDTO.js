export default class ConsultaDTO {
    constructor(info) {
        this.id_consulta = info.id_consulta;
        this.id_paciente = info.id_paciente;
        this.id_medico = info.id_medico;
        this.id_consultorio = info.id_consultorio;
        this.motivo = info.motivo;
        this.observaciones = info.observaciones;
        this.estado = info.estado;
        this.fecha_programada = info.fecha_programada;
        this.fecha_realizacion = info.fecha_realizacion;
        this.duracion_min = info.duracion_min;
        this.tarifa = info.tarifa;
        this.creado_en = info.creado_en;
    }

    getId_consulta() {
        return this.id_consulta;
    }

    getId_paciente() {
        return this.id_paciente;
    }

    getId_medico() {
        return this.id_medico;
    }

    getId_consultorio() {
        return this.id_consultorio;
    }

    getMotivo() {
        return this.motivo;
    }

    getObservaciones() {
        return this.observaciones;
    }

    getEstado() {
        return this.estado;
    }

    getFecha_programada() {
        return this.fecha_programada;
    }

    getFecha_realizacion() {
        return this.fecha_realizacion;
    }

    getDuracion_min() {
        return this.duracion_min;
    }

    getTarifa() {
        return this.tarifa;
    }

    getCreado_en() {
        return this.creado_en;
    }
}