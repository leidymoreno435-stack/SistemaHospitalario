import { Router } from 'express';
import proxy from 'express-http-proxy';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

<<<<<<< HEAD
// Docs
router.use('/api-docs', proxy('http://ms-clinical:3004', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/security', proxy('http://ms-security:3000', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/personal', proxy('http://ms-personal:3001', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/patients', proxy('http://ms-patients:3002', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/clinical', proxy('http://ms-clinical:3004', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));
router.use('/docs/billing', proxy('http://ms-billing:3005', { proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}` }));

// Auth (Público)
router.use('/auth', proxy('http://ms-security:3000', { proxyReqPathResolver: (req) => `/api/v1/auth${req.url}` }));
=======
/**
 * Genera la configuración limpia para el proxy
 * @param {string} basePath - Ruta base de destino en el microservicio (ej. '/api/v1/patients')
 */
const createProxyOptions = (basePath) => ({
    parseReqBody: false, 
    proxyReqPathResolver: (req) => `${basePath}${req.url}`
});

// ==========================================
// DOCUMENTACIÓN SWAGGER (PÚBLICAS)
// ==========================================
router.use('/api-docs', proxy('http://ms-clinical:3004', createProxyOptions('/api/v1/api-docs')));
router.use('/docs/security', proxy('http://ms-security:3000', createProxyOptions('/api/v1/api-docs')));
router.use('/docs/personal', proxy('http://ms-personal:3001', createProxyOptions('/api/v1/api-docs')));
router.use('/docs/patients', proxy('http://ms-patients:3002', createProxyOptions('/api/v1/api-docs')));
router.use('/docs/clinical', proxy('http://ms-clinical:3004', createProxyOptions('/api/v1/api-docs')));
router.use('/docs/billing', proxy('http://ms-billing:3005', createProxyOptions('/api/v1/api-docs')));

// ==========================================
// RUTAS PÚBLICAS DE NEGOCIO
// ==========================================
router.use('/auth', proxy('http://ms-security:3000', createProxyOptions('/api/v1/auth')));
>>>>>>> 0d9d72c5b2672db31ec3ec3bbb62a6ad85fcf7b6

// ==========================================
// RUTAS PROTEGIDAS (Requieren Token)
// ==========================================
<<<<<<< HEAD

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
=======
router.use('/usuarios', verifyToken, proxy('http://ms-security:3000', createProxyOptions('/api/v1/usuarios')));
router.use('/rol', verifyToken, proxy('http://ms-security:3000', createProxyOptions('/api/v1/rol')));
router.use('/patients', verifyToken, proxy('http://ms-patients:3002', createProxyOptions('/api/v1/patients')));
router.use('/personal', verifyToken, proxy('http://ms-personal:3001', createProxyOptions('/api/v1/personal')));
router.use('/especialidad', verifyToken, proxy('http://ms-personal:3001', createProxyOptions('/api/v1/especialidad')));
router.use('/consultas', verifyToken, proxy('http://ms-clinical:3004', createProxyOptions('/api/v1/consultas')));
router.use('/clinical', verifyToken, proxy('http://ms-clinical:3004', createProxyOptions('/api/v1/clinical')));
router.use('/billing', verifyToken, proxy('http://ms-billing:3005', createProxyOptions('/api/v1/billing')));
>>>>>>> 0d9d72c5b2672db31ec3ec3bbb62a6ad85fcf7b6

export default router;