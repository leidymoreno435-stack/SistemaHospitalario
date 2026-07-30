export default class servicioDTO {
    constructor(datos) {
        this.id_servicio = datos.id_servicio;
        this.codigo_servicio = datos.codigo_servicio;
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.precio_unitario = datos.precio_unitario;
    }
    
    getId_servicio() { return this.id_servicio; }
    getCodigo_servicio() { return this.codigo_servicio; }
    getNombre() { return this.nombre; }
    getDescripcion() { return this.descripcion; }
    getPrecio_unitario() { return this.precio_unitario; }
    setId_servicio(id_servicio) { this.id_servicio = id_servicio; }
    setCodigo_servicio(codigo_servicio) { this.codigo_servicio = codigo_servicio; }
    setNombre(nombre) { this.nombre = nombre; }
    setDescripcion(descripcion) { this.descripcion = descripcion; }
    setPrecio_unitario(precio_unitario) { this.precio_unitario = precio_unitario; }
}
