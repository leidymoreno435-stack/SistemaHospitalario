import { Router } from "express";
import { medicamentoContainer } from "../conteiner/medicamentoContainer.js";

const router = Router();

router.post('/medicamento', medicamentoContainer.create);
router.get('/medicamento', medicamentoContainer.read);
router.get('/medicamento/:id', medicamentoContainer.readById);
router.put('/medicamento/:id', medicamentoContainer.update);
router.patch('/medicamento/:id', medicamentoContainer.patch);
router.delete('/medicamento/:id', medicamentoContainer.delete);

export default router;
