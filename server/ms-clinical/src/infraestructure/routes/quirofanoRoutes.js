import { Router } from "express";
import { quirofanoContainer } from "../conteiner/quirofanoContainer.js";

const router = Router();

router.post('/quirofano', quirofanoContainer.create);
router.get('/quirofano', quirofanoContainer.read);
router.get('/quirofano/:id', quirofanoContainer.readById);
router.put('/quirofano/:id', quirofanoContainer.update);
router.patch('/quirofano/:id', quirofanoContainer.patch);
router.delete('/quirofano/:id', quirofanoContainer.delete);

export default router;
