export default class personalDTO {
    constructor(infor) {
        this.id_personal = infor.id_personal;
        this.nombres = infor.nombres;
        this.apellidos = infor.apellidos;
        this.identificacion = infor.identificacion;
        this.id_usuario = infor.id_usuario;
        this.id_especialidad = infor.id_especialidad;
        this.telefono = infor.telefono;
        this.email = infor.email;
        this.activo = infor.activo;
        this.creado_en = infor.creado_en;
    }

    getId_personal() {
        return this.id_personal;
    }

    getNombres() {
        return this.nombres;
    }

    getApellidos() {
        return this.apellidos;
    }

    getIdentificacion() {
        return this.identificacion;
    }

    getId_usuario() {
        return this.id_usuario;
    }

    getId_especialidad() {
        return this.id_especialidad;
    }

    getTelefono() {
        return this.telefono;
    }

    getEmail() {
        return this.email;
    }

    getActivo() {
        return this.activo;
    }

    getCreado_en() {
        return this.creado_en;
    }
}