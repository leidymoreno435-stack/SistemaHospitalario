export default class Specialty {
    constructor(id_especialidad, nombre, descripcion) {
        this.id_especialidad = id_especialidad;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    getId_especialidad() {
        return this.id_especialidad;
    }
    getNombre() {
        return this.nombre;
    }
    getDescripcion() {
        return this.descripcion;
    }
}