import { Router } from 'express';
import proxy from 'express-http-proxy';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

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

// ==========================================
// RUTAS PROTEGIDAS (Requieren Token)
// ==========================================
router.use('/usuarios', verifyToken, proxy('http://ms-security:3000', createProxyOptions('/api/v1/usuarios')));
router.use('/rol', verifyToken, proxy('http://ms-security:3000', createProxyOptions('/api/v1/rol')));
router.use('/patients', verifyToken, proxy('http://ms-patients:3002', createProxyOptions('/api/v1/patients')));
router.use('/personal', verifyToken, proxy('http://ms-personal:3001', createProxyOptions('/api/v1/personal')));
router.use('/especialidad', verifyToken, proxy('http://ms-personal:3001', createProxyOptions('/api/v1/especialidad')));
router.use('/consultas', verifyToken, proxy('http://ms-clinical:3004', createProxyOptions('/api/v1/consultas')));
router.use('/clinical', verifyToken, proxy('http://ms-clinical:3004', createProxyOptions('/api/v1/clinical')));
router.use('/billing', verifyToken, proxy('http://ms-billing:3005', createProxyOptions('/api/v1/billing')));

export default router;