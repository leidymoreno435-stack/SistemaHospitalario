export default class medicamentoDTO {
    constructor(datos) {
        this.id_medicamento = datos.id_medicamento;
        this.nombre_comercial = datos.nombre_comercial;
        this.principio_activo = datos.principio_activo;
        this.presentacion = datos.presentacion;
        this.stock = datos.stock;
        this.precio_unitario = datos.precio_unitario;
    }
    
    getId_medicamento() { return this.id_medicamento; }
    getNombre_comercial() { return this.nombre_comercial; }
    getPrincipio_activo() { return this.principio_activo; }
    getPresentacion() { return this.presentacion; }
    getStock() { return this.stock; }
    getPrecio_unitario() { return this.precio_unitario; }
    setId_medicamento(id_medicamento) { this.id_medicamento = id_medicamento; }
    setNombre_comercial(nombre_comercial) { this.nombre_comercial = nombre_comercial; }
    setPrincipio_activo(principio_activo) { this.principio_activo = principio_activo; }
    setPresentacion(presentacion) { this.presentacion = presentacion; }
    setStock(stock) { this.stock = stock; }
    setPrecio_unitario(precio_unitario) { this.precio_unitario = precio_unitario; }
}
