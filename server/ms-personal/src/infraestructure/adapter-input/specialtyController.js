import specialtyDTO from "../../application/DTO/specialtyDTO.js";
import specialtyInputPort from "../../application/ports/input/specialtyInput.js";
import specialtyFilter from "../../domain/filters/specialtyFilter.js";

// Función auxiliar para desempaquetar 'resultado' anidado si viene de capas inferiores
const desempaquetar = (data) => {
    let actual = data;
    while (actual && typeof actual === 'object' && 'resultado' in actual && actual.resultado !== null) {
        actual = actual.resultado;
    }
    return actual;
};

export default class specialtyController extends specialtyInputPort {
    constructor(specialtyCommandUsesCase, specialtyQueryUsesCase) {
        super();
        this.specialtyCommandUsesCase = specialtyCommandUsesCase;
        this.specialtyQueryUsesCase = specialtyQueryUsesCase;
    }

    // CREATE
    create = async (req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        try {
            const dtoEsp = new specialtyDTO(datos);
            console.log("Ingresamos al controlador (create) con traceId: " + idRequest + " | Nombre: " + dtoEsp.getNombre());

            const resultadoUseCase = await this.specialtyCommandUsesCase.create(dtoEsp);

            // Si el caso de uso/adaptador retorna un estado de error
            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                const status = (resultadoUseCase.resultado.includes("Ya existe") || resultadoUseCase.resultado.includes("duplicad")) ? 409 : 400;
                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/especialidad" }
                });
            }

            return res.status(201).json({
                estado: "ok",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/especialidad",
                    patch: "/especialidad",
                    delete: "/especialidad"
                }
            });

        } catch (error) {
            const message = error.message || "";
            const status = error.statusCode || (message.includes("Ya existe") ? 409 : 400);

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/especialidad" }
            });
        }
    };

    // READ 
    read = async (req, res) => {
        const idRequest = req.traceId;
        const { id_especialidad, nombre, descripcion } = req.query;

        try {
            const filter = new specialtyFilter(
                id_especialidad || null,
                nombre || null,
                descripcion || null
            );

            console.log("Ingresamos al controlador (read) con traceId: " + idRequest);

            const resultadoUseCase = await this.specialtyQueryUsesCase.read(filter);

            return res.status(200).json({
                estado: "ok",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    post: "/especialidad",
                    patch: "/especialidad",
                    delete: "/especialidad"
                }
            });

        } catch (error) {
            return res.status(500).json({
                traceId: idRequest,
                error: "Ocurrió un error al obtener la especialidad: " + error.message,
                enlaces: { post: "/especialidad" }
            });
        }
    };

    // UPDATE
    update = async (req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        try {
            const dtoEsp = new specialtyDTO(datos);
            console.log("Ingresamos al controlador (update) con traceId: " + idRequest + " | Especialidad ID: " + dtoEsp.getId_especialidad());

            const resultadoUseCase = await this.specialtyCommandUsesCase.update(dtoEsp);

            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                let status = 400;
                if (resultadoUseCase.resultado.includes("no encontrad")) {
                    status = 404;
                } else if (resultadoUseCase.resultado.includes("Ya existe")) {
                    status = 409;
                }

                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/especialidad" }
                });
            }

            return res.status(200).json({
                mensaje: "Especialidad actualizada correctamente",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/especialidad",
                    delete: "/especialidad"
                }
            });

        } catch (error) {
            const message = error.message || "";
            let status = error.statusCode || 400;

            if (message.includes("no encontrad")) {
                status = 404;
            } else if (message.includes("Ya existe")) {
                status = 409;
            }

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/especialidad" }
            });
        }
    };

    // DELETE 
    delete = async (req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        try {
            const dtoEsp = new specialtyDTO(datos);
            console.log("Ingresamos al controlador (delete) con traceId: " + idRequest + " | Especialidad ID: " + dtoEsp.getId_especialidad());

            const resultadoUseCase = await this.specialtyCommandUsesCase.delete(dtoEsp);

            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                const status = resultadoUseCase.resultado.includes("no encontrad") ? 404 : 400;
                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/especialidad" }
                });
            }

            return res.status(200).json({
                mensaje: "Petición recibida correctamente",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/especialidad",
                    post: "/especialidad"
                }
            });

        } catch (error) {
            const message = error.message || "";
            const status = error.statusCode || (message.includes("no encontrad") ? 404 : 400);

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/especialidad" }
            });
        }
    };
}