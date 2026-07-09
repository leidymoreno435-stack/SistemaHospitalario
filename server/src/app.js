import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./modules/security/infraestructure/routes/usuarioRoutes.js";
import rolRoutes from "./modules/security/infraestructure/routes/rolRoutes.js";
import authRoutes from "./modules/security/infraestructure/routes/authRoutes.js";
import patientRoutes from "./modules/patients/infraestructure/routes/patientRoutes.js";
import personalRoutes from "./modules/personal/infraestructure/routes/personalRoutes.js";
import clinicalRoutes from "./modules/clinical/infraestructure/routes/clinicalRoutes.js";
import billingRoutes from "./modules/billing/infraestructure/routes/billingRoutes.js";
import { traceMiddleWare } from "./infraestructure/middleware/TraceMiddleware.js";
import { loggerMiddleWare } from "./infraestructure/middleware/LoggerMiddleware.js";
import { timeMiddleware } from "./infraestructure/middleware/TimeMiddleware.js";

dotenv.config();


const app = express();
app.use(cors());

app.use(traceMiddleWare);
app.use(loggerMiddleWare);
app.use(timeMiddleware);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", rolRoutes);
app.use("/api", patientRoutes);
app.use("/api", personalRoutes);
app.use("/api", clinicalRoutes);
app.use("/api", billingRoutes);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API Hospital funcionando"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        estado: 'error',
        resultado: 'Algo salió mal en el servidor',
        error: err.message
    });
});

export default app;