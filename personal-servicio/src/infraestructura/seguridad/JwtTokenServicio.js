import jwt from "jsonwebtoken";

export default class JwtTokenServicio {
  constructor({ secreto,  expiracion = "15m" }) {
    if (!secreto) {
      throw new Error("JWT_SECRET no está configurado");
    }

    this.secreto = secreto;
    this.expiracion = expiracion;
  }

  generar(datos) {
    return jwt.sign(datos, this.secreto, {
      expiresIn: this.expiracion,
      issuer: "usuario-servicio",
      audience: "plataforma-web"
    });
  }

  verificar(token) {
    return jwt.verify(token, this.secreto, {
      issuer: "usuario-servicio",
      audience: "plataforma-web"
    });
  }
}