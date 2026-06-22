export default class rol {
    constructor(id, nombre, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;

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