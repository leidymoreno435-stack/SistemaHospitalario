export default class Patient {
    constructor(datos) {
        this.id_paciente = datos.id_paciente;
        this.nombres = datos.nombres;
        this.apellidos = datos.apellidos;
        this.fecha_nacimiento = datos.fecha_nacimiento;
        this.sexo = datos.sexo;
        this.identificacion = datos.identificacion;
        this.telefono = datos.telefono;
        this.email = datos.email;
        this.direccion = datos.direccion;
        this.creado_en = datos.creado_en;
    }
}
