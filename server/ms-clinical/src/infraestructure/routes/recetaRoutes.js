import { Router } from "express";
import { recetaContainer } from "../conteiner/recetaContainer.js";

const router = Router();

router.post('/receta', recetaContainer.create);
router.get('/receta', recetaContainer.read);
router.get('/receta/:id', recetaContainer.readById);
router.put('/receta/:id', recetaContainer.update);
router.patch('/receta/:id', recetaContainer.patch);
router.delete('/receta/:id', recetaContainer.delete);

export default router;
