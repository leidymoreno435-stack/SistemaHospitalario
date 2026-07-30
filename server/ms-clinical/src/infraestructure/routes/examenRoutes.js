import { Router } from "express";
import { examenContainer } from "../conteiner/examenContainer.js";

const router = Router();

router.post('/examen', examenContainer.create);
router.get('/examen', examenContainer.read);
router.get('/examen/:id', examenContainer.readById);
router.put('/examen/:id', examenContainer.update);
router.patch('/examen/:id', examenContainer.patch);
router.delete('/examen/:id', examenContainer.delete);

export default router;
