import { Router } from "express";
import { personalContainer } from "../conteiner/personalContainer.js";

const router = Router();

router.post('/personal', personalContainer.create);
router.get('/personal', personalContainer.read);
router.get('/personal/:id', personalContainer.readById);
router.put('/personal/:id', personalContainer.update);
router.patch('/personal/:id', personalContainer.patch);
router.delete('/personal/:id', personalContainer.delete);

export default router;
