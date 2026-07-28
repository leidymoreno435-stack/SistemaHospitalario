export default class Patient {
    constructor(id_paciente,nombres,apellidos,fecha_nacimiento,sexo,identificacion,telefono,email,direccion,creado_en) 
    {
        this.id_paciente = id_paciente;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.fecha_nacimiento = fecha_nacimiento;
        this.sexo = sexo;
        this.identificacion = identificacion;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
        this.creado_en = creado_en;
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