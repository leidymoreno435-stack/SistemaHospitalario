export default class recetaDTO {
    constructor(datos) {
        this.id_receta = datos.id_receta;
        this.id_paciente = datos.id_paciente;
        this.id_medico = datos.id_medico;
        this.fecha_emision = datos.fecha_emision;
        this.instrucciones = datos.instrucciones;
    }
    
    getId_receta() { return this.id_receta; }
    getId_paciente() { return this.id_paciente; }
    getId_medico() { return this.id_medico; }
    getFecha_emision() { return this.fecha_emision; }
    getInstrucciones() { return this.instrucciones; }
    setId_receta(id_receta) { this.id_receta = id_receta; }
    setId_paciente(id_paciente) { this.id_paciente = id_paciente; }
    setId_medico(id_medico) { this.id_medico = id_medico; }
    setFecha_emision(fecha_emision) { this.fecha_emision = fecha_emision; }
    setInstrucciones(instrucciones) { this.instrucciones = instrucciones; }
}
