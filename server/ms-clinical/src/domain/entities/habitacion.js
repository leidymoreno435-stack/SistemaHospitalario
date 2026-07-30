export default class Habitacion {
    constructor(datos) {
        this.id_habitacion = datos.id_habitacion;
        this.codigo = datos.codigo;
        this.piso = datos.piso;
        this.tipo = datos.tipo;
        this.descripcion = datos.descripcion;
    }
}
