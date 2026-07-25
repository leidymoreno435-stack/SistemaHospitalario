export default class Personal {
    constructor(id, nombre, apellido, identificacion, idUsuario, idspecialty, telefono, email, activo, creado_en) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.identificacion = identificacion;
        this.idUsuario = idUsuario;
        this.idspecialty = idspecialty;
        this.telefono = telefono;
        this.email = email;
        this.activo = activo;
        this.creado_en = creado_en;
    }
    getId = () => {
        return this.id;
    }
    getNombre = () => {
        return this.nombre;
    }
    getApellido = () => {
        return this.apellido;
    }
    getIdentificacion = () => {
        return this.identificacion;
    }
    getIdUsuario = () => {
        return this.idUsuario;
    }
    getIdSpecialty = () => {
        return this.idspecialty;
    }
    getTelefono = () => {
        return this.telefono;
    }
    getEmail = () => {
        return this.email;
    }
    getActivo = () => {
        return this.activo;
    }
    getCreadoEn = () => {
        return this.creado_en;
    }

}