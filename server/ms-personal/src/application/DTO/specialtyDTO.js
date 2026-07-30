export default class specialtyDTO {
    constructor(infor) {
        this.id_especialidad = infor.id_especialidad;
        this.nombre = infor.nombre;
        this.descripcion = infor.descripcion;
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