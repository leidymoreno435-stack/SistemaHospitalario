import { Router } from 'express';
import proxy from 'express-http-proxy';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// ==========================================
// DOCUMENTACIÓN SWAGGER (PÚBLICAS PARA TODOS LOS SERVICIOS)
// ==========================================
// Permite acceder a /api-docs directo (por defecto apunta a ms-clinical)
router.use('/api-docs', proxy('http://ms-clinical:3004', {
    proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}`
}));

// Documentación individual por microservicio
router.use('/docs/security', proxy('http://ms-security:3000', {
    proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}`
}));

router.use('/docs/personal', proxy('http://ms-personal:3001', {
    proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}`
}));

router.use('/docs/patients', proxy('http://ms-patients:3002', {
    proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}`
}));

router.use('/docs/clinical', proxy('http://ms-clinical:3004', {
    proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}`
}));

router.use('/docs/billing', proxy('http://ms-billing:3005', {
    proxyReqPathResolver: (req) => `/api/v1/api-docs${req.url}`
}));

// ==========================================
// RUTAS PÚBLICAS DE NEGOCIO
// ==========================================
// El login/register en ms-security no requiere token
router.use('/auth', proxy('http://ms-security:3000', {
    proxyReqPathResolver: (req) => `/api/v1/auth${req.url}`
}));

// ==========================================
// RUTAS PROTEGIDAS
// ==========================================
// Las peticiones internas de usuarios/roles a security sí requieren token
router.use('/usuarios', verifyToken, proxy('http://ms-security:3000', {
    proxyReqPathResolver: (req) => `/api/v1/usuarios${req.url}`
}));

// Proxy hacia roles
router.use('/rol', verifyToken, proxy('http://ms-security:3000', {
    proxyReqPathResolver: (req) => `/api/v1/rol${req.url}`
}));

// Proxy hacia Pacientes
router.use('/patients', verifyToken, proxy('http://ms-patients:3002', {
    proxyReqPathResolver: (req) => `/api/v1/patients${req.url}`
}));

// Proxy hacia Personal
router.use('/personal', verifyToken, proxy('http://ms-personal:3001', {
    proxyReqPathResolver: (req) => `/api/v1/personal${req.url}`
}));

// Proxy hacia Consultas (Atendido por ms-clinical en el puerto 3004)
router.use('/consultas', verifyToken, proxy('http://ms-clinical:3004', {
    proxyReqPathResolver: (req) => `/api/v1/consultas${req.url}`
}));

// Proxy hacia Historias Clínicas / Otros módulos clínicos
router.use('/clinical', verifyToken, proxy('http://ms-clinical:3004', {
    proxyReqPathResolver: (req) => `/api/v1/clinical${req.url}`
}));

// Proxy hacia Facturación (Billing)
router.use('/billing', verifyToken, proxy('http://ms-billing:3005', {
    proxyReqPathResolver: (req) => `/api/v1/billing${req.url}`
}));

export default router;