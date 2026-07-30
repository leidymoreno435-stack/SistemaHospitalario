export default class Medicamento {
    constructor(datos) {
        this.id_medicamento = datos.id_medicamento;
        this.nombre_comercial = datos.nombre_comercial;
        this.principio_activo = datos.principio_activo;
        this.presentacion = datos.presentacion;
        this.stock = datos.stock;
        this.precio_unitario = datos.precio_unitario;
    }
}
