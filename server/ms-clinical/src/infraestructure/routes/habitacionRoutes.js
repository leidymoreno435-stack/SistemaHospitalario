import { Router } from "express";
import { habitacionContainer } from "../conteiner/habitacionContainer.js";

const router = Router();

router.post('/habitacion', habitacionContainer.create);
router.get('/habitacion', habitacionContainer.read);
router.get('/habitacion/:id', habitacionContainer.readById);
router.put('/habitacion/:id', habitacionContainer.update);
router.patch('/habitacion/:id', habitacionContainer.patch);
router.delete('/habitacion/:id', habitacionContainer.delete);

export default router;
