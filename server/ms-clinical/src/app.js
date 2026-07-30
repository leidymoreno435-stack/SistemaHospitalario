/**
 * app.js — Punto de entrada del microservicio ms-clinical
 *
 * Responsabilidad: Configurar Express, middleware global, rutas y arrancar el servidor.
 *
 * Este archivo es el "Composition Root" de la capa de infraestructura HTTP.
 * No contiene lógica de negocio.
 *
 * Puerto: 3004 (según configuración del API Gateway)
 *         El gateway proxea /clinical → http://ms-clinical:3004
 */
import express  from 'express';
import cors     from 'cors';
import 'dotenv/config';

import consultaRoutes      from './infraestructure/routes/consultaRoutes.js';
import historiaClinicaRoutes from './infraestructure/routes/historiaClinicaRoutes.js';

const app  = express();
const PORT = process.env.PORT || 3004;

// ─── Middlewares globales ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Middleware de trazabilidad (log de cada request) ────────────────────────
app.use((req, res, next) => {
    console.log(`[ms-clinical] ${new Date().toISOString()} | ${req.method} ${req.originalUrl}`);
    next();
});

// ─── Health Check ────────────────────────────────────────────────────────────
// Útil para Docker y balanceadores de carga.
app.get('/health', (req, res) => {
    res.status(200).json({
        estado:    'OK',
        servicio:  'ms-clinical',
        version:   '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// ─── Rutas de la API ─────────────────────────────────────────────────────────
app.use('/api/v1/consultas', consultaRoutes);
app.use('/api/v1/historial', historiaClinicaRoutes);

// ─── Manejo de ruta no encontrada (404) ──────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        estado:  'error',
        mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
    });
});

// ─── Manejo global de errores (500) ──────────────────────────────────────────
// Este middleware captura errores que los controladores no capturen.
app.use((err, req, res, next) => {
    console.error('[ms-clinical] Error no controlado:', err.message);
    res.status(500).json({
        estado:  'error',
        mensaje: 'Error interno del servidor',
        detalle: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ─── Arranque del servidor ────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`🏥 [ms-clinical] Servidor corriendo en http://localhost:${PORT}`);
    console.log(`   → GET  /api/v1/consultas`);
    console.log(`   → POST /api/v1/consultas`);
    console.log(`   → GET  /api/v1/historial`);
    console.log(`   → POST /api/v1/historial`);
    console.log(`   → GET  /health`);
});

export default app;
