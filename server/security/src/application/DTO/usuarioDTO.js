export default class usuarioDTO {
    constructor(usuario) {
        this.id_usuario = usuario.id;
        this.username = usuario.username;
        this.password_hash = usuario.password_hash;
        this.id_rol = usuario.id_rol;
        this.activo = usuario.activo;
        this.fecha_creacion = usuario.fecha_creacion;
    }
    getId_usuario() {
        return this.id_usuario;
    }
    getUsername() {
        return this.username;
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