export default class specialtyDTO {
    constructor(datos) {
        this.id_especialidad = datos.id_especialidad;
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
    }
    
    getId_especialidad() { return this.id_especialidad; }
    getNombre() { return this.nombre; }
    getDescripcion() { return this.descripcion; }
    setId_especialidad(id_especialidad) { this.id_especialidad = id_especialidad; }
    setNombre(nombre) { this.nombre = nombre; }
    setDescripcion(descripcion) { this.descripcion = descripcion; }
}
