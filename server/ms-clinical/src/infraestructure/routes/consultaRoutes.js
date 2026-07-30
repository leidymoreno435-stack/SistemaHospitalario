import { Router } from "express";
import { consultaContainer } from "../conteiner/consultaContainer.js";

const router = Router();

router.post('/consulta', consultaContainer.create);
router.get('/consulta', consultaContainer.read);
router.get('/consulta/:id', consultaContainer.readById);
router.put('/consulta/:id', consultaContainer.update);
router.patch('/consulta/:id', consultaContainer.patch);
router.delete('/consulta/:id', consultaContainer.delete);

export default router;
