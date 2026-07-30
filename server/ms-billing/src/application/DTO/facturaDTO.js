export default class facturaDTO {
    constructor(datos) {
        this.id_factura = datos.id_factura;
        this.numero_factura = datos.numero_factura;
        this.id_paciente = datos.id_paciente;
        this.id_usuario = datos.id_usuario;
        this.fecha_emision = datos.fecha_emision;
        this.total = datos.total;
        this.estado_pago = datos.estado_pago;
    }
    
    getId_factura() { return this.id_factura; }
    getNumero_factura() { return this.numero_factura; }
    getId_paciente() { return this.id_paciente; }
    getId_usuario() { return this.id_usuario; }
    getFecha_emision() { return this.fecha_emision; }
    getTotal() { return this.total; }
    getEstado_pago() { return this.estado_pago; }
    setId_factura(id_factura) { this.id_factura = id_factura; }
    setNumero_factura(numero_factura) { this.numero_factura = numero_factura; }
    setId_paciente(id_paciente) { this.id_paciente = id_paciente; }
    setId_usuario(id_usuario) { this.id_usuario = id_usuario; }
    setFecha_emision(fecha_emision) { this.fecha_emision = fecha_emision; }
    setTotal(total) { this.total = total; }
    setEstado_pago(estado_pago) { this.estado_pago = estado_pago; }
}
