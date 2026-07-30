export default class DetalleReceta {
    constructor(datos) {
        this.id_detalle = datos.id_detalle;
        this.id_receta = datos.id_receta;
        this.id_medicamento = datos.id_medicamento;
        this.dosis = datos.dosis;
        this.cantidad = datos.cantidad;
        this.indicaciones = datos.indicaciones;
    }
}
