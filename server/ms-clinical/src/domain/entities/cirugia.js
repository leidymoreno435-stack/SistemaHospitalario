export default class Cirugia {
    constructor(datos) {
        this.id_cirugia = datos.id_cirugia;
        this.id_ingreso = datos.id_ingreso;
        this.id_quirofano = datos.id_quirofano;
        this.id_cirujano = datos.id_cirujano;
        this.procedimiento = datos.procedimiento;
        this.fecha_programada = datos.fecha_programada;
        this.fecha_realizacion = datos.fecha_realizacion;
        this.estado = datos.estado;
        this.notas = datos.notas;
    }
}
