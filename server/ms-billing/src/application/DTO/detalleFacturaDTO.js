export default class detalleFacturaDTO {
    constructor(datos) {
        this.id_detalle_factura = datos.id_detalle_factura;
        this.id_factura = datos.id_factura;
        this.id_servicio = datos.id_servicio;
        this.descripcion = datos.descripcion;
        this.cantidad = datos.cantidad;
        this.precio_unitario = datos.precio_unitario;
    }
    
    getId_detalle_factura() { return this.id_detalle_factura; }
    getId_factura() { return this.id_factura; }
    getId_servicio() { return this.id_servicio; }
    getDescripcion() { return this.descripcion; }
    getCantidad() { return this.cantidad; }
    getPrecio_unitario() { return this.precio_unitario; }
    setId_detalle_factura(id_detalle_factura) { this.id_detalle_factura = id_detalle_factura; }
    setId_factura(id_factura) { this.id_factura = id_factura; }
    setId_servicio(id_servicio) { this.id_servicio = id_servicio; }
    setDescripcion(descripcion) { this.descripcion = descripcion; }
    setCantidad(cantidad) { this.cantidad = cantidad; }
    setPrecio_unitario(precio_unitario) { this.precio_unitario = precio_unitario; }
}
