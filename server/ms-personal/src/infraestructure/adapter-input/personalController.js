import personalDTO from "../../application/DTO/personalDTO.js";
import personalInputPort from "../../application/ports/input/personalInput.js";
import personalFilter from "../../domain/filters/personalFilter.js";

// Función auxiliar para desempaquetar 'resultado' anidado si viene de capas inferiores
const desempaquetar = (data) => {
    let actual = data;
    while (actual && typeof actual === 'object' && 'resultado' in actual && actual.resultado !== null) {
        actual = actual.resultado;
    }
    return actual;
};

export default class personalController extends personalInputPort {
    constructor(personalCommandUsesCase, personalQueryUsesCase) {
        super();
        this.personalCommandUsesCase = personalCommandUsesCase;
        this.personalQueryUsesCase = personalQueryUsesCase;
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
            const dtoPer = new personalDTO(datos);
            console.log("Ingresamos al controlador (create) con traceId: " + idRequest + " | Nombre: " + dtoPer.getNombres());

            const resultadoUseCase = await this.personalCommandUsesCase.create(dtoPer);

            // Si el caso de uso/adaptador retorna un estado de error
            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                const status = (resultadoUseCase.resultado.includes("Ya existe") || resultadoUseCase.resultado.includes("duplicad")) ? 409 : 400;
                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/personal" }
                });
            }

            return res.status(201).json({
                estado: "ok",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/personal",
                    patch: "/personal",
                    delete: "/personal"
                }
            });

        } catch (error) {
            const message = error.message || "";
            const status = error.statusCode || (message.includes("Ya existe") ? 409 : 400);

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/personal" }
            });
        }
    };

    // READ 
    read = async (req, res) => {
        const idRequest = req.traceId;
        const { id_personal, nombres, apellidos, identificacion, id_especialidad, activo } = req.query;

        try {
            const filter = new personalFilter(
                id_personal || null,
                nombres || null,
                apellidos || null,
                identificacion || null,
                id_especialidad || null,
                activo !== undefined ? activo : null
            );

            console.log("Ingresamos al controlador (read) con traceId: " + idRequest);

            const resultadoUseCase = await this.personalQueryUsesCase.read(filter);

            return res.status(200).json({
                estado: "ok",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    post: "/personal",
                    patch: "/personal",
                    delete: "/personal"
                }
            });

        } catch (error) {
            return res.status(500).json({
                traceId: idRequest,
                error: "Ocurrió un error al obtener el personal: " + error.message,
                enlaces: { post: "/personal" }
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
            const dtoPer = new personalDTO(datos);
            console.log("Ingresamos al controlador (update) con traceId: " + idRequest + " | Personal ID: " + dtoPer.getId_personal());

            const resultadoUseCase = await this.personalCommandUsesCase.update(dtoPer);

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
                    enlaces: { get: "/personal" }
                });
            }

            return res.status(200).json({
                mensaje: "Personal actualizado correctamente",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/personal",
                    delete: "/personal"
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
                enlaces: { get: "/personal" }
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
            const dtoPer = new personalDTO(datos);
            console.log("Ingresamos al controlador (delete) con traceId: " + idRequest + " | Personal ID: " + dtoPer.getId_personal());

            const resultadoUseCase = await this.personalCommandUsesCase.delete(dtoPer);

            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                const status = resultadoUseCase.resultado.includes("no encontrad") ? 404 : 400;
                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/personal" }
                });
            }

            return res.status(200).json({
                mensaje: "Petición recibida correctamente",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/personal",
                    post: "/personal"
                }
            });

        } catch (error) {
            const message = error.message || "";
            const status = error.statusCode || (message.includes("no encontrad") ? 404 : 400);

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/personal" }
            });
        }
    };
}