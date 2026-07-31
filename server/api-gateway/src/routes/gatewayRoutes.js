import { Router } from 'express';
import proxy from 'express-http-proxy';
import { verifyToken, checkRole, ROLES } from '../middleware/authMiddleware.js';

const router = Router();

/**
 * Genera la configuración limpia para el proxy y remueve barras finales extra
 * @param {string} basePath - Ruta base de destino en el microservicio
 */
const createProxyOptions = (basePath) => ({
    parseReqBody: false, 
    proxyReqPathResolver: (req) => {
        const fullPath = `${basePath}${req.url}`;
        // Elimina la slash final sobrante que genera 404 en OpenAPI
        return (fullPath.endsWith('/') && fullPath.length > 1) 
            ? fullPath.slice(0, -1) 
            : fullPath;
    }
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
// RUTAS DE AUTENTICACIÓN (MS-SECURITY)
// ==========================================

// Login es PÚBLICO
router.post(
    '/auth/login', 
    proxy('http://ms-security:3000', createProxyOptions('/api/v1'))
);

// Registro (SOLO ADMINISTRADOR)
router.post(
    '/auth/register', 
    verifyToken, 
    checkRole(ROLES.ADMIN), 
    proxy('http://ms-security:3000', createProxyOptions('/api/v1'))
);

router.post(
    '/auth/registro', 
    verifyToken, 
    checkRole(ROLES.ADMIN), 
    proxy('http://ms-security:3000', createProxyOptions('/api/v1'))
);

// ==========================================
// RUTAS PROTEGIDAS Y RESTRINGIDAS POR ROL
// ==========================================

// EXCLUSIVO ADMINISTRADOR (id_rol: 1)
router.use('/usuarios', verifyToken, checkRole(ROLES.ADMIN), proxy('http://ms-security:3000', createProxyOptions('/api/v1/usuarios')));
router.use('/rol', verifyToken, checkRole(ROLES.ADMIN), proxy('http://ms-security:3000', createProxyOptions('/api/v1/rol')));
router.use('/personal', verifyToken, checkRole(ROLES.ADMIN), proxy('http://ms-personal:3001', createProxyOptions('/api/v1/personal')));

// Mapeo en español para especialidad -> microservicio /specialty
router.use('/especialidad', verifyToken, checkRole(ROLES.ADMIN), proxy('http://ms-personal:3001', createProxyOptions('/api/v1/specialty')));
router.use('/specialty', verifyToken, checkRole(ROLES.ADMIN), proxy('http://ms-personal:3001', createProxyOptions('/api/v1/specialty')));

// PACIENTES: Admin (1), Médico (2), Enfermería (3), Recepcionista (4)
router.use('/patient', verifyToken, checkRole(ROLES.ADMIN, ROLES.MEDICO, ROLES.ENFERMERIA, ROLES.RECEPCIONISTA), proxy('http://ms-patients:3002', createProxyOptions('/api/v1/patient')));

// CLINICAL / CONSULTAS: Admin (1), Médico (2), Enfermería (3)
const clinicalMiddleware = [verifyToken, checkRole(ROLES.ADMIN, ROLES.MEDICO, ROLES.ENFERMERIA)];
const clinicalEntities = [
    '/consultas',
    '/clinical',
    '/cama',
    '/cirugia',
    '/consultorio',
    '/detalleReceta',
    '/examen',
    '/habitacion',
    '/historiaClinica',
    '/ingresoHospitalario',
    '/medicamento',
    '/quirofano',
    '/receta'
];

clinicalEntities.forEach((route) => {
    router.use(route, ...clinicalMiddleware, proxy('http://ms-clinical:3004', createProxyOptions(`/api/v1${route}`)));
});

// FACTURACIÓN (MS-BILLING): Admin (1), Recepcionista (4)
const billingMiddleware = [verifyToken, checkRole(ROLES.ADMIN, ROLES.RECEPCIONISTA)];
const billingEntities = [
    '/billing',
    '/factura',
    '/detalleFactura',
    '/servicio'
];

billingEntities.forEach((route) => {
    router.use(route, ...billingMiddleware, proxy('http://ms-billing:3005', createProxyOptions(`/api/v1${route}`)));
});

export default router;