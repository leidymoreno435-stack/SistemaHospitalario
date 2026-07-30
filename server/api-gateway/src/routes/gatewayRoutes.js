import { Router } from 'express';
import proxy from 'express-http-proxy';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Docs
router.use('/api-docs', proxy('http://ms-clinical:3004', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/security', proxy('http://ms-security:3000', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/personal', proxy('http://ms-personal:3001', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/patients', proxy('http://ms-patients:3002', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/clinical', proxy('http://ms-clinical:3004', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/billing', proxy('http://ms-billing:3005', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));

// Auth (Público)
router.use('/auth', proxy('http://ms-security:3000', { proxyReqPathResolver: (req) => `/api/v1/auth${req.url}` }));

// ==========================================
// RUTAS PROTEGIDAS
// ==========================================

// ms-security
router.use('/usuarios', verifyToken, proxy('http://ms-security:3000', { proxyReqPathResolver: (req) => `/api/v1/usuarios${req.url}` }));
router.use('/rol', verifyToken, proxy('http://ms-security:3000', { proxyReqPathResolver: (req) => `/api/v1/rol${req.url}` }));

// ms-patients
router.use('/patient', verifyToken, proxy('http://ms-patients:3002', { proxyReqPathResolver: (req) => `/api/v1/patient${req.url}` }));

// ms-personal
router.use('/personal', verifyToken, proxy('http://ms-personal:3001', { proxyReqPathResolver: (req) => `/api/v1/personal${req.url}` }));
router.use('/specialty', verifyToken, proxy('http://ms-personal:3001', { proxyReqPathResolver: (req) => `/api/v1/specialty${req.url}` }));

// ms-billing
router.use('/factura', verifyToken, proxy('http://ms-billing:3005', { proxyReqPathResolver: (req) => `/api/v1/factura${req.url}` }));
router.use('/detalleFactura', verifyToken, proxy('http://ms-billing:3005', { proxyReqPathResolver: (req) => `/api/v1/detalleFactura${req.url}` }));
router.use('/servicio', verifyToken, proxy('http://ms-billing:3005', { proxyReqPathResolver: (req) => `/api/v1/servicio${req.url}` }));

// ms-clinical
const clinicalRoutes = [
    'consulta', 'consultorio', 'historiaClinica', 'examen', 'receta',
    'detalleReceta', 'medicamento', 'cirugia', 'quirofano',
    'ingresoHospitalario', 'habitacion', 'cama'
];

clinicalRoutes.forEach(route => {
    router.use(`/${route}`, verifyToken, proxy('http://ms-clinical:3004', { 
        proxyReqPathResolver: (req) => `/api/v1/${route}${req.url}` 
    }));
});

export default router;