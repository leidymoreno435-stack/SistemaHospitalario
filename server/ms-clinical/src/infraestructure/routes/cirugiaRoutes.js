import { Router } from "express";
import { cirugiaContainer } from "../conteiner/cirugiaContainer.js";

const router = Router();

router.post('/cirugia', cirugiaContainer.create);
router.get('/cirugia', cirugiaContainer.read);
router.get('/cirugia/:id', cirugiaContainer.readById);
router.put('/cirugia/:id', cirugiaContainer.update);
router.patch('/cirugia/:id', cirugiaContainer.patch);
router.delete('/cirugia/:id', cirugiaContainer.delete);

export default router;
