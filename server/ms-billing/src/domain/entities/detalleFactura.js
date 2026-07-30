export default class DetalleFactura {
    constructor(datos) {
        this.id_detalle_factura = datos.id_detalle_factura;
        this.id_factura = datos.id_factura;
        this.id_servicio = datos.id_servicio;
        this.descripcion = datos.descripcion;
        this.cantidad = datos.cantidad;
        this.precio_unitario = datos.precio_unitario;
    }
}
