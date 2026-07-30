export default class PatientDTO {
    constructor(info) {
        this.id_paciente = info.id_paciente;
        this.nombres = info.nombres;
        this.apellidos = info.apellidos;
        this.fecha_nacimiento = info.fecha_nacimiento;
        this.sexo = info.sexo;
        this.identificacion = info.identificacion;
        this.telefono = info.telefono;
        this.email = info.email;
        this.direccion = info.direccion;
        this.creado_en = info.creado_en;
    }

    getId_paciente() {
        return this.id_paciente;
    }

    getNombres() {
        return this.nombres;
    }

    getApellidos() {
        return this.apellidos;
    }

    getFecha_nacimiento() {
        return this.fecha_nacimiento;
    }

    getSexo() {
        return this.sexo;
    }

    getIdentificacion() {
        return this.identificacion;
    }

    getTelefono() {
        return this.telefono;
    }

    getEmail() {
        return this.email;
    }

    getDireccion() {
        return this.direccion;
    }

    getCreado_en() {
        return this.creado_en;
    }
}