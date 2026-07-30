import { Router } from "express";
import { camaContainer } from "../conteiner/camaContainer.js";

const router = Router();

router.post('/cama', camaContainer.create);
router.get('/cama', camaContainer.read);
router.get('/cama/:id', camaContainer.readById);
router.put('/cama/:id', camaContainer.update);
router.patch('/cama/:id', camaContainer.patch);
router.delete('/cama/:id', camaContainer.delete);

export default router;
