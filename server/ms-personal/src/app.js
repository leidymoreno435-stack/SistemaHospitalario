import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import OpenApiValidator from 'express-openapi-validator'
import 'dotenv/config';

import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

import { traceMiddleWare } from '../../infraestructure/middleware/TraceMiddleware.js';
import { timeMiddleware } from '../../infraestructure/middleware/TimeMiddleware.js';
import { loggerMiddleWare } from '../../infraestructure/middleware/LoggerMiddleware.js';
import personalRuta from './infraestructure/routes/personalRoutes.js'

//Librerias Core
const app = express();
app.use(cors());
app.use(express.json())

//Contratos
const urlContrato = './src/infraestructure/contrato-api/api-v1.yaml';
const swaggerDocument = YAML.load(urlContrato);
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MiddleWare 
app.use(traceMiddleWare);
app.use(timeMiddleware);
app.use(loggerMiddleWare)

app.use(
    '/api/v1',
    OpenApiValidator.middleware({
        apiSpec: urlContrato,
        validateRequests: true,
        validateResponses: false
    })
)


// Manejo de errores del contrato OpenAPI
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        mensaje: err.message,
        errores: err.errors
    })
})

//telemetria
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// THROTTLING
// Después de 5 peticiones por minuto, la API empieza a responder más lento.
const speedLimiter = slowDown({
    windowMs: 60 * 1000, // 1 minuto
    delayAfter: 5, // permite 5 peticiones normales
    delayMs: () => 500 // agrega 500 ms de retraso por cada petición extra
});

app.use(speedLimiter);

// RATE LIMITING
// Después de 10 peticiones por minuto, bloquea temporalmente.
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    limit: 10,
    message: {
        error: "Demasiadas solicitudes. Intente nuevamente en un minuto."
    }
});
app.use(limiter);

// rutas 
app.use('/api/v1', personalRuta);

// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: "OK",
        service: "API de personal",
        timestamp: new Date()
    });
});

//servidor
app.listen(3001, () => {
    console.log('Servidor personal corriendo en puerto 3001')
})