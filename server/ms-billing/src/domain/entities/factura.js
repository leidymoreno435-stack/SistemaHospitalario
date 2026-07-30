export default class Factura {
    constructor(datos) {
        this.id_factura = datos.id_factura;
        this.numero_factura = datos.numero_factura;
        this.id_paciente = datos.id_paciente;
        this.id_usuario = datos.id_usuario;
        this.fecha_emision = datos.fecha_emision;
        this.total = datos.total;
        this.estado_pago = datos.estado_pago;
    }
}
