export default class detalleRecetaDTO {
    constructor(datos) {
        this.id_detalle = datos.id_detalle;
        this.id_receta = datos.id_receta;
        this.id_medicamento = datos.id_medicamento;
        this.dosis = datos.dosis;
        this.cantidad = datos.cantidad;
        this.indicaciones = datos.indicaciones;
    }
    
    getId_detalle() { return this.id_detalle; }
    getId_receta() { return this.id_receta; }
    getId_medicamento() { return this.id_medicamento; }
    getDosis() { return this.dosis; }
    getCantidad() { return this.cantidad; }
    getIndicaciones() { return this.indicaciones; }
    setId_detalle(id_detalle) { this.id_detalle = id_detalle; }
    setId_receta(id_receta) { this.id_receta = id_receta; }
    setId_medicamento(id_medicamento) { this.id_medicamento = id_medicamento; }
    setDosis(dosis) { this.dosis = dosis; }
    setCantidad(cantidad) { this.cantidad = cantidad; }
    setIndicaciones(indicaciones) { this.indicaciones = indicaciones; }
}
