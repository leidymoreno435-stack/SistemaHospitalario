import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import gatewayRoutes from './routes/gatewayRoutes.js';

const app = express();

// ==========================================
// SEGURIDAD GLOBAL DEL GATEWAY
// ==========================================
// 1. Helmet (Protección de cabeceras HTTP)
app.use(helmet());

// 2. CORS Restrictivo
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
