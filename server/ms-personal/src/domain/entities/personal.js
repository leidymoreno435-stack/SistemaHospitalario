export default class Personal {
    constructor(id_personal, nombres, apellidos, identificacion, id_usuario, id_especialidad, telefono, email, activo, creado_en) {
        this.id_personal = id_personal;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.identificacion = identificacion;
        this.id_usuario = id_usuario;
        this.id_especialidad = id_especialidad;
        this.telefono = telefono;
        this.email = email;
        this.activo = activo;
        this.creado_en = creado_en;
    }


    getId_personal() {
        return this.id_personal;
    }
    getNombres() {
        return this.nombres
    }
    getApellidos() {
        return this.apellidos
    }
    getIdentificacion() {
        return this.identificacion
    }
    getId_usuario() {
        return this.id_usuario
    }
    getId_especialidad() {
        return this.id_especialidad
    }
    getTelefono() {
        return this.telefono
    }
    getEmail() {
        return this.email
    }
    getActivo() {
        return this.activo
    }
    getCreado_en() {
        return this.creado_en
    }
}