export class PersonalDTO {
    constructor(infor) {
        this.id = infor.id;
        this.nombre = infor.nombre;
        this.apellido = infor.apellido;
        this.identificacion = infor.identificacion;
        this.idUsuario = infor.idUsuario;
        this.idSpecialty = infor.idSpecialty;
        this.telefono = infor.telefono;
        this.email = infor.email;
        this.activo = infor.activo;
        this.creado_en = infor.creado_en;
    }

    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    getApellido() {
        return this.apellido;
    }

    getIdentificacion() {
        return this.identificacion;
    }

    getIdUsuario() {
        return this.idUsuario;
    }

    getIdSpecialty() {
        return this.idSpecialty;
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

    getCreadoEn() {
        return this.creado_en;
    }
}