export class AuthControlador {
  constructor(servicioAutenticacion) {
    this.servicioAutenticacion = servicioAutenticacion;
  }

  login = async (req, res) => {
    try {
      const resultado = await this.servicioAutenticacion.login(req.body);

      res.status(200).json(resultado);
    } catch (error) {
      res.status(401).json({
        estado: "error",
        mensaje: error.message,
      });
    }
  };
}
