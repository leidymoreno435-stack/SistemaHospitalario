import express from "express";
import cors from "cors";
import usuarioRoutes from "../src/infraestructure/routes/usuarioRoutes.js";
import authRoutes from "../src/infraestructure/routes/authRoutes.js"
import { authMiddleware } from "../../infraestructure/middleware/authMiddleware.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        estado: "OK",
        servicio: "ms-security"
    });
});

// Rutas de la API
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", authMiddleware, usuarioRoutes);



// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        estado: "error",
        mensaje: "Ruta no encontrada"
    });
});

export default app;