export default class usuario {
    constructor(id_usuario, username, password_hash, id_rol, activo, fecha_creacion) {
        this.id_usuario = id_usuario;
        this.username = username;
        this.password_hash = password_hash;
        this.id_rol = id_rol;
        this.activo = activo;
        this.fecha_creacion = fecha_creacion;
    }
    getId_usuario() {
        return this.id_usuario;
    }
    getUsername() {
        return this.username;
    }
    getPassword_hash() {
        return this.password_hash;
    }
    getId_rol() {
        return this.id_rol;
    }
    getActivo() {
        return this.activo;
    }
    getFecha_creacion() {
        return this.fecha_creacion;
    }

}