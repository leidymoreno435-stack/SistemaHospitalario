export default class HistoriaClinica {
    constructor(datos) {
        this.id_historia = datos.id_historia;
        this.id_paciente = datos.id_paciente;
        this.id_consulta = datos.id_consulta;
        this.id_ingreso = datos.id_ingreso;
        this.resumen = datos.resumen;
        this.anotaciones = datos.anotaciones;
        this.fecha_registro = datos.fecha_registro;
    }
}
