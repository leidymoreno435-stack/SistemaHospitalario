import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import OpenApiValidator from 'express-openapi-validator';
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import fs from 'fs';

import facturaRoutes from './infraestructure/routes/facturaRoutes.js';
import detalleFacturaRoutes from './infraestructure/routes/detalleFacturaRoutes.js';
import servicioRoutes from './infraestructure/routes/servicioRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const urlContrato = './src/infraestructure/contrato-api/api-v1.yaml';
if (fs.existsSync(urlContrato)) {
    const swaggerDocument = YAML.load(urlContrato);
    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api/v1', OpenApiValidator.middleware({
        apiSpec: urlContrato,
        validateRequests: true,
        validateResponses: false
    }));
}

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const speedLimiter = slowDown({
    windowMs: 60 * 1000,
    delayAfter: 5,
    delayMs: () => 500
});
app.use(speedLimiter);

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    message: { estado: "error", mensaje: "Demasiadas solicitudes" }
});
app.use(limiter);

app.use('/api/v1', facturaRoutes);
app.use('/api/v1', detalleFacturaRoutes);
app.use('/api/v1', servicioRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "OK", service: "ms-billing", timestamp: new Date() });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        estado: "error",
        mensaje: err.message,
        errores: err.errors
    });
});

export default app;
