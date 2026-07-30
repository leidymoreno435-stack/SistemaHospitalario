export default class camaDTO {
    constructor(datos) {
        this.id_cama = datos.id_cama;
        this.id_habitacion = datos.id_habitacion;
        this.numero = datos.numero;
        this.estado = datos.estado;
    }
    
    getId_cama() { return this.id_cama; }
    getId_habitacion() { return this.id_habitacion; }
    getNumero() { return this.numero; }
    getEstado() { return this.estado; }
    setId_cama(id_cama) { this.id_cama = id_cama; }
    setId_habitacion(id_habitacion) { this.id_habitacion = id_habitacion; }
    setNumero(numero) { this.numero = numero; }
    setEstado(estado) { this.estado = estado; }
}
