export default class cirugiaDTO {
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
    
    getId_cirugia() { return this.id_cirugia; }
    getId_ingreso() { return this.id_ingreso; }
    getId_quirofano() { return this.id_quirofano; }
    getId_cirujano() { return this.id_cirujano; }
    getProcedimiento() { return this.procedimiento; }
    getFecha_programada() { return this.fecha_programada; }
    getFecha_realizacion() { return this.fecha_realizacion; }
    getEstado() { return this.estado; }
    getNotas() { return this.notas; }
    setId_cirugia(id_cirugia) { this.id_cirugia = id_cirugia; }
    setId_ingreso(id_ingreso) { this.id_ingreso = id_ingreso; }
    setId_quirofano(id_quirofano) { this.id_quirofano = id_quirofano; }
    setId_cirujano(id_cirujano) { this.id_cirujano = id_cirujano; }
    setProcedimiento(procedimiento) { this.procedimiento = procedimiento; }
    setFecha_programada(fecha_programada) { this.fecha_programada = fecha_programada; }
    setFecha_realizacion(fecha_realizacion) { this.fecha_realizacion = fecha_realizacion; }
    setEstado(estado) { this.estado = estado; }
    setNotas(notas) { this.notas = notas; }
}
