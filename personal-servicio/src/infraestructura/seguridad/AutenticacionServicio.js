export default class AutenticacionServicio {
  constructor({ hasher, tokenServicio, usuarios = [] }) {
    this.hasher = hasher;
    this.tokenServicio = tokenServicio;
    this.usuarios = usuarios;
  }

  async login({ nombre, contrasena }) {
    const usuario = this.usuarios.find(
      (item) => item.nombre === nombre && item.activo
    );

    if (!usuario) {
      throw new Error("Credenciales invalidas");
    }

    const contrasenaValida = await this.hasher.verificar(
      contrasena,
      usuario.contrasenaHash
    );

    if (!contrasenaValida) {
      throw new Error("Credenciales invalidas");
    }

    const token = this.tokenServicio.generar({
      sub: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    });

    return {
      estado: "ok",
      token,
      tipo: "Bearer",
      expiracion: this.tokenServicio.expiracion,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    };
  }

  verificarToken(token) {
    return this.tokenServicio.verificar(token);
  }
}
