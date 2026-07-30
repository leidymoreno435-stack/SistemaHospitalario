/**
 * historiaClinicaRoutes.js — Endpoints REST para HistoriaClinica
 *
 * Endpoints:
 *   GET    /api/v1/historial                        — Listar todos
 *   GET    /api/v1/historial/:id                    — Por ID
 *   GET    /api/v1/historial/paciente/:idPaciente   — Por paciente
 *   POST   /api/v1/historial                        — Crear registro
 *   DELETE /api/v1/historial/:id                    — Eliminar
 */
import { Router } from 'express';
import { historiaClinicaControlador } from '../container/HistoriaClinicaContainer.js';

const router = Router();

// IMPORTANTE: La ruta con parámetro literal debe ir ANTES que /:id
// para que /paciente/:idPaciente no sea interpretada como /:id
router.get(    '/paciente/:idPaciente', historiaClinicaControlador.buscarPorPaciente);

router.get(    '/',    historiaClinicaControlador.listar);
router.get(    '/:id', historiaClinicaControlador.buscarPorId);
router.post(   '/',    historiaClinicaControlador.crear);
router.delete( '/:id', historiaClinicaControlador.eliminar);

export default router;
