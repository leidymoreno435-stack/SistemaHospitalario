import { Router } from "express";
import { rolController } from "../conteiner/rolContainer.js";

const router = Router();

router.post('/rol', rolController.create);
router.get('/rol', rolController.read);
router.delete('/rol', rolController.delete);

export default router;