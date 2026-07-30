export default class Personal {
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
}
