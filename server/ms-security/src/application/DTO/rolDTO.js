export default class rolDTO {
    constructor(rol) {
        this.id = rol.id;
        this.nombre = rol.nombre;
        this.descripcion = rol.descripcion;
    }
    getId() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    getDescripcion() {
        return this.descripcion;
    }
}