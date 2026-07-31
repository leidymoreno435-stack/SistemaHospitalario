import express from 'express';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import fs from 'fs';

import consultaRoutes from './infraestructure/routes/consultaRoutes.js';
import consultorioRoutes from './infraestructure/routes/consultorioRoutes.js';
import historiaClinicaRoutes from './infraestructure/routes/historiaClinicaRoutes.js';
import examenRoutes from './infraestructure/routes/examenRoutes.js';
import recetaRoutes from './infraestructure/routes/recetaRoutes.js';
import detalleRecetaRoutes from './infraestructure/routes/detalleRecetaRoutes.js';
import medicamentoRoutes from './infraestructure/routes/medicamentoRoutes.js';
import cirugiaRoutes from './infraestructure/routes/cirugiaRoutes.js';
import quirofanoRoutes from './infraestructure/routes/quirofanoRoutes.js';
import ingresoHospitalarioRoutes from './infraestructure/routes/ingresoHospitalarioRoutes.js';
import habitacionRoutes from './infraestructure/routes/habitacionRoutes.js';
import camaRoutes from './infraestructure/routes/camaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


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

app.use('/api/v1', consultaRoutes);
app.use('/api/v1', consultorioRoutes);
app.use('/api/v1', historiaClinicaRoutes);
app.use('/api/v1', examenRoutes);
app.use('/api/v1', recetaRoutes);
app.use('/api/v1', detalleRecetaRoutes);
app.use('/api/v1', medicamentoRoutes);
app.use('/api/v1', cirugiaRoutes);
app.use('/api/v1', quirofanoRoutes);
app.use('/api/v1', ingresoHospitalarioRoutes);
app.use('/api/v1', habitacionRoutes);
app.use('/api/v1', camaRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "OK", service: "ms-clinical", timestamp: new Date() });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        estado: "error",
        mensaje: err.message,
        errores: err.errors
    });
});

export default app;
