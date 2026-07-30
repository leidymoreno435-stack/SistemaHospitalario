export default class Servicio {
    constructor(datos) {
        this.id_servicio = datos.id_servicio;
        this.codigo_servicio = datos.codigo_servicio;
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.precio_unitario = datos.precio_unitario;
    }
}
