export default class Personal {
    constructor(
        id,
        nombre,
        apellido,
        identificacion,
        idUsuario,
        idSpecialty,
        telefono,
        email,
        activo,
        creado_en
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.identificacion = identificacion;
        this.idUsuario = idUsuario;
        this.idSpecialty = idSpecialty;
        this.telefono = telefono;
        this.email = email;
        this.activo = activo;
        this.creado_en = creado_en;
    }

    getId = () => this.id;
    getNombre = () => this.nombre;
    getApellido = () => this.apellido;
    getIdentificacion = () => this.identificacion;
    getIdUsuario = () => this.idUsuario;
    getIdSpecialty = () => this.idSpecialty;
    getTelefono = () => this.telefono;
    getEmail = () => this.email;
    getActivo = () => this.activo;
    getCreadoEn = () => this.creado_en;
}