export default class historiaClinicaDTO {
    constructor(datos) {
        this.id_historia = datos.id_historia;
        this.id_paciente = datos.id_paciente;
        this.id_consulta = datos.id_consulta;
        this.id_ingreso = datos.id_ingreso;
        this.resumen = datos.resumen;
        this.anotaciones = datos.anotaciones;
        this.fecha_registro = datos.fecha_registro;
    }
    
    getId_historia() { return this.id_historia; }
    getId_paciente() { return this.id_paciente; }
    getId_consulta() { return this.id_consulta; }
    getId_ingreso() { return this.id_ingreso; }
    getResumen() { return this.resumen; }
    getAnotaciones() { return this.anotaciones; }
    getFecha_registro() { return this.fecha_registro; }
    setId_historia(id_historia) { this.id_historia = id_historia; }
    setId_paciente(id_paciente) { this.id_paciente = id_paciente; }
    setId_consulta(id_consulta) { this.id_consulta = id_consulta; }
    setId_ingreso(id_ingreso) { this.id_ingreso = id_ingreso; }
    setResumen(resumen) { this.resumen = resumen; }
    setAnotaciones(anotaciones) { this.anotaciones = anotaciones; }
    setFecha_registro(fecha_registro) { this.fecha_registro = fecha_registro; }
}
