import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import gatewayRoutes from './routes/gatewayRoutes.js';

const app = express();
// ==========================================
// MIDDLEWARE DE LOGS (TRAZABILIDAD)
// ==========================================
app.use((req, res, next) => {
    const start = Date.now();
    console.log(`\n➡️  [ENTRADA] ${req.method} ${req.originalUrl}`);

    // Capturar cuando la respuesta finaliza
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`⬅️  [SALIDA] ${req.method} ${req.originalUrl} | Estado: ${res.statusCode} | ${duration}ms`);
    });

    next();
});

// ==========================================
// SEGURIDAD GLOBAL DEL GATEWAY
// ==========================================
// 1. Helmet (Protección de cabeceras HTTP)
app.use(helmet());

// 2. CORS Restrictivo
// 2. CORS con soporte para Angular y React/Vite
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:4200', // Angular
    'http://localhost:5173' // React/Vite
].filter(Boolean); // Elimina valores undefined si FRONTEND_URL no está definido

app.use(cors({
    origin: function(origin, callback) {
        // Permite peticiones sin origen (como Postman o curl) o si está en la lista de permitidos
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por política CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Rate Limiting (Prevenir ataques de fuerza bruta / DDoS)
const globalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 100, // Límite de 100 peticiones por minuto por IP
    message: { error: 'Demasiadas solicitudes. Intente nuevamente más tarde.' }
});
app.use(globalLimiter);

// Nota: No usamos express.json() aquí de manera global porque express-http-proxy 
// prefiere recibir el stream original para pasarlo al microservicio interno.

// ==========================================
// ENRUTAMIENTO
// ==========================================
app.use('/api/v1', gatewayRoutes);

// Manejo de rutas inexistentes (404) en el Gateway
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada en el API Gateway' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Gateway Error:', err.message);
    res.status(500).json({ error: 'Error interno en el API Gateway' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway corriendo en el puerto ${PORT}`);
});