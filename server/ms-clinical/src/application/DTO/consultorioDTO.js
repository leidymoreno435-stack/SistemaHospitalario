export default class consultorioDTO {
    constructor(datos) {
        this.id_consultorio = datos.id_consultorio;
        this.codigo = datos.codigo;
        this.nombre = datos.nombre;
        this.piso = datos.piso;
    }
    
    getId_consultorio() { return this.id_consultorio; }
    getCodigo() { return this.codigo; }
    getNombre() { return this.nombre; }
    getPiso() { return this.piso; }
    setId_consultorio(id_consultorio) { this.id_consultorio = id_consultorio; }
    setCodigo(codigo) { this.codigo = codigo; }
    setNombre(nombre) { this.nombre = nombre; }
    setPiso(piso) { this.piso = piso; }
}
