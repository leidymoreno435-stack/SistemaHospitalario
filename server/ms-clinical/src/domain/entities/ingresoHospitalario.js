export default class IngresoHospitalario {
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
}
