import { Router } from "express";

export default function crearAuthRutas(authControlador) {
  const router = Router();

  router.post("/login", authControlador.login);

  return router;
}
