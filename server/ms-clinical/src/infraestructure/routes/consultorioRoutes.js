import { Router } from "express";
import { consultorioContainer } from "../conteiner/consultorioContainer.js";

const router = Router();

router.post('/consultorio', consultorioContainer.create);
router.get('/consultorio', consultorioContainer.read);
router.get('/consultorio/:id', consultorioContainer.readById);
router.put('/consultorio/:id', consultorioContainer.update);
router.patch('/consultorio/:id', consultorioContainer.patch);
router.delete('/consultorio/:id', consultorioContainer.delete);

export default router;
