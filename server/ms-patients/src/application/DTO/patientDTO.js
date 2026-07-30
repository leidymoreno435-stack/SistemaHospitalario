export default class patientDTO {
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
    
    getId_paciente() { return this.id_paciente; }
    getNombres() { return this.nombres; }
    getApellidos() { return this.apellidos; }
    getFecha_nacimiento() { return this.fecha_nacimiento; }
    getSexo() { return this.sexo; }
    getIdentificacion() { return this.identificacion; }
    getTelefono() { return this.telefono; }
    getEmail() { return this.email; }
    getDireccion() { return this.direccion; }
    getCreado_en() { return this.creado_en; }
    setId_paciente(id_paciente) { this.id_paciente = id_paciente; }
    setNombres(nombres) { this.nombres = nombres; }
    setApellidos(apellidos) { this.apellidos = apellidos; }
    setFecha_nacimiento(fecha_nacimiento) { this.fecha_nacimiento = fecha_nacimiento; }
    setSexo(sexo) { this.sexo = sexo; }
    setIdentificacion(identificacion) { this.identificacion = identificacion; }
    setTelefono(telefono) { this.telefono = telefono; }
    setEmail(email) { this.email = email; }
    setDireccion(direccion) { this.direccion = direccion; }
    setCreado_en(creado_en) { this.creado_en = creado_en; }
}
