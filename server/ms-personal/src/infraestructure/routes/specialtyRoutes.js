import { Router } from "express";
import { specialtyContainer } from "../conteiner/specialtyContainer.js";

const router = Router();

router.post('/specialty', specialtyContainer.create);
router.get('/specialty', specialtyContainer.read);
router.get('/specialty/:id', specialtyContainer.readById);
router.put('/specialty/:id', specialtyContainer.update);
router.patch('/specialty/:id', specialtyContainer.patch);
router.delete('/specialty/:id', specialtyContainer.delete);

export default router;
