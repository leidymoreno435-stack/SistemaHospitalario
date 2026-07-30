export default class personalDTO {
    constructor(datos) {
        this.id_personal = datos.id_personal;
        this.nombres = datos.nombres;
        this.apellidos = datos.apellidos;
        this.identificacion = datos.identificacion;
        this.id_usuario = datos.id_usuario;
        this.id_especialidad = datos.id_especialidad;
        this.telefono = datos.telefono;
        this.email = datos.email;
        this.activo = datos.activo;
        this.creado_en = datos.creado_en;
    }
    
    getId_personal() { return this.id_personal; }
    getNombres() { return this.nombres; }
    getApellidos() { return this.apellidos; }
    getIdentificacion() { return this.identificacion; }
    getId_usuario() { return this.id_usuario; }
    getId_especialidad() { return this.id_especialidad; }
    getTelefono() { return this.telefono; }
    getEmail() { return this.email; }
    getActivo() { return this.activo; }
    getCreado_en() { return this.creado_en; }
    setId_personal(id_personal) { this.id_personal = id_personal; }
    setNombres(nombres) { this.nombres = nombres; }
    setApellidos(apellidos) { this.apellidos = apellidos; }
    setIdentificacion(identificacion) { this.identificacion = identificacion; }
    setId_usuario(id_usuario) { this.id_usuario = id_usuario; }
    setId_especialidad(id_especialidad) { this.id_especialidad = id_especialidad; }
    setTelefono(telefono) { this.telefono = telefono; }
    setEmail(email) { this.email = email; }
    setActivo(activo) { this.activo = activo; }
    setCreado_en(creado_en) { this.creado_en = creado_en; }
}
