export default class quirofanoDTO {
    constructor(datos) {
        this.id_quirofano = datos.id_quirofano;
        this.nombre = datos.nombre;
        this.ubicacion = datos.ubicacion;
    }
    
    getId_quirofano() { return this.id_quirofano; }
    getNombre() { return this.nombre; }
    getUbicacion() { return this.ubicacion; }
    setId_quirofano(id_quirofano) { this.id_quirofano = id_quirofano; }
    setNombre(nombre) { this.nombre = nombre; }
    setUbicacion(ubicacion) { this.ubicacion = ubicacion; }
}
