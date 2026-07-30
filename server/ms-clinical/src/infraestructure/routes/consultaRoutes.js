/**
 * consultaRoutes.js — Definición de endpoints REST para Consulta
 *
 * Responsabilidad: Mapear URLs HTTP → métodos del ConsultaControlador.
 * Las rutas NO contienen lógica de negocio ni acceden a la BD directamente.
 *
 * Principio SOLID: SRP — Solo define el enrutamiento.
 *
 * Endpoints:
 *   GET    /api/v1/consultas              — Listar todas (con filtros opcionales)
 *   GET    /api/v1/consultas/:id          — Buscar por ID
 *   POST   /api/v1/consultas              — Crear nueva consulta
 *   PUT    /api/v1/consultas/:id          — Actualizar consulta existente
 *   DELETE /api/v1/consultas/:id          — Eliminar consulta
 */
import { Router } from 'express';
import { consultaControlador } from '../container/ConsultaContainer.js';

const router = Router();

router.get(    '/',    consultaControlador.listar);
router.get(    '/:id', consultaControlador.buscarPorId);
router.post(   '/',    consultaControlador.crear);
router.put(    '/:id', consultaControlador.actualizar);
router.delete( '/:id', consultaControlador.eliminar);

export default router;
