export default class Receta {
    constructor(datos) {
        this.id_receta = datos.id_receta;
        this.id_paciente = datos.id_paciente;
        this.id_medico = datos.id_medico;
        this.fecha_emision = datos.fecha_emision;
        this.instrucciones = datos.instrucciones;
    }
}
