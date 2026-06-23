import { Router } from "express";
import { usuarioController } from "../conteiner/UsuarioConteiner.js";

const router = Router();

router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.read);
router.delete('/usuarios', usuarioController.delete);

export default router;