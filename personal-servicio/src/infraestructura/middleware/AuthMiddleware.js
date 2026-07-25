export function crearAuthMiddleware(servicioAutenticacion) {
  return (req, res, next) => {
    const cabecera = req.headers.authorization;

    if (!cabecera) {
      return res.status(401).json({
        estado: "error",
        mensaje: "Falta el token Bearer",
      });
    }

    const [tipo, token] = cabecera.split(" ");

    if (tipo !== "Bearer" || !token) {
      return res.status(401).json({
        estado: "error",
        mensaje: "Formato de token invalido",
      });
    }

    try {
      req.usuarioAutenticado = servicioAutenticacion.verificarToken(token);
      next();
    } catch (error) {
      return res.status(401).json({
        estado: "error",
        mensaje: "Token invalido o expirado",
      });
    }
  };
}
