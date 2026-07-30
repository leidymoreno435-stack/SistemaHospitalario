export default class habitacionDTO {
    constructor(datos) {
        this.id_habitacion = datos.id_habitacion;
        this.codigo = datos.codigo;
        this.piso = datos.piso;
        this.tipo = datos.tipo;
        this.descripcion = datos.descripcion;
    }
    
    getId_habitacion() { return this.id_habitacion; }
    getCodigo() { return this.codigo; }
    getPiso() { return this.piso; }
    getTipo() { return this.tipo; }
    getDescripcion() { return this.descripcion; }
    setId_habitacion(id_habitacion) { this.id_habitacion = id_habitacion; }
    setCodigo(codigo) { this.codigo = codigo; }
    setPiso(piso) { this.piso = piso; }
    setTipo(tipo) { this.tipo = tipo; }
    setDescripcion(descripcion) { this.descripcion = descripcion; }
}
