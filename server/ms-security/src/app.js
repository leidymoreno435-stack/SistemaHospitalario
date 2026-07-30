import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import OpenApiValidator from 'express-openapi-validator'
import 'dotenv/config'

import rateLimit from "express-rate-limit"
import slowDown from "express-slow-down"

import { traceMiddleWare } from './infraestructure/middleware/TraceMiddleware.js'
import { timeMiddleware } from './infraestructure/middleware/TimeMiddleware.js'
import { loggerMiddleWare } from './infraestructure/middleware/LoggerMiddleware.js'

import authRoutes from './infraestructure/routes/authRoutes.js'
import usuarioRoutes from './infraestructure/routes/usuarioRoutes.js'
import rolRoutes from './infraestructure/routes/rolRoutes.js'


const app = express();


// ========================
// Core
// ========================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// ========================
// Contrato OpenAPI
// ========================

const urlContrato = './src/infraestructure/contrato-api/api-v1.yaml';

const swaggerDocument = YAML.load(urlContrato);

app.use(
    '/api/v1/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);


// ========================
// Middlewares
// ========================

app.use(traceMiddleWare);
app.use(timeMiddleware);
app.use(loggerMiddleWare);


// ========================
// Validación contrato
// ========================

app.use(
    '/api/v1',
    OpenApiValidator.middleware({
        apiSpec:urlContrato,
        validateRequests:true,
        validateResponses:false
    })
);


// ========================
// Telemetría
// ========================

app.use((req,res,next)=>{

    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.url}`
    );

    next();

});


// ========================
// Throttling
// ========================

const speedLimiter = slowDown({

    windowMs:60 * 1000,
    delayAfter:5,
    delayMs:()=>500

});


app.use(speedLimiter);


// ========================
// Rate limit
// ========================

const limiter = rateLimit({

    windowMs:60 * 1000,
    limit:10,

    message:{
        estado:"error",
        mensaje:"Demasiadas solicitudes"
    }

});


app.use(limiter);


// ========================
// Rutas
// ========================

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', usuarioRoutes);
app.use('/api/v1', rolRoutes);


// ========================
// Health
// ========================

app.get('/health',(req,res)=>{

    res.json({

        status:"OK",
        service:"ms-security",
        timestamp:new Date()

    });

});

// ========================
// Manejo errores OpenAPI
// ========================

app.use((err,req,res,next)=>{

    res.status(err.status || 500).json({

        estado:"error",
        mensaje:err.message,
        errores:err.errors

    });

});

export default app;