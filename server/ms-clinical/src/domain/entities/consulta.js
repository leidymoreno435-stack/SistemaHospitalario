export default class Consulta {
    constructor(id_consulta,id_paciente,id_medico,id_consultorio,motivo,observaciones,estado,fecha_programada,fecha_realizacion,duracion_min,tarifa,creado_en) 
    {
        this.id_consulta = id_consulta;
        this.id_paciente = id_paciente;
        this.id_medico = id_medico;
        this.id_consultorio = id_consultorio;
        this.motivo = motivo;
        this.observaciones = observaciones;
        this.estado = estado;
        this.fecha_programada = fecha_programada;
        this.fecha_realizacion = fecha_realizacion;
        this.duracion_min = duracion_min;
        this.tarifa = tarifa;
        this.creado_en = creado_en;
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