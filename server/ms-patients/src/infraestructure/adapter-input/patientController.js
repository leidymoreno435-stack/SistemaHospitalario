import patientDTO from "../../application/DTO/patientDTO.js";
import patientInputPort from "../../application/ports/input/patientInput.js";
import patientFilter from "../../domain/filters/patientFilter.js";

// Función auxiliar para desempaquetar 'resultado' anidado si viene de capas inferiores
const desempaquetar = (data) => {
    let actual = data;
    while (actual && typeof actual === 'object' && 'resultado' in actual && actual.resultado !== null) {
        actual = actual.resultado;
    }
    return actual;
};

export default class patientController extends patientInputPort {
    constructor(patientCommandUsesCase, patientQueryUsesCase) {
        super();
        this.patientCommandUsesCase = patientCommandUsesCase;
        this.patientQueryUsesCase = patientQueryUsesCase;
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
            const dtoPaciente = new patientDTO(datos);
            console.log("Ingresamos al controlador (create) con traceId: " + idRequest + " | Nombres: " + dtoPaciente.getNombres());

            const resultadoUseCase = await this.patientCommandUsesCase.create(dtoPaciente);

            // Si el caso de uso/adaptador retorna un estado de error
            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                const status = (resultadoUseCase.resultado.includes("Ya existe") || resultadoUseCase.resultado.includes("duplicad")) ? 409 : 400;
                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/patients" }
                });
            }

            return res.status(201).json({
                estado: "ok",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/patients",
                    patch: "/patients",
                    delete: "/patients"
                }
            });

        } catch (error) {
            const message = error.message || "";
            const status = error.statusCode || (message.includes("Ya existe") ? 409 : 400);

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/patients" }
            });
        }
    };

    // READ 
    read = async (req, res) => {
        const idRequest = req.traceId;
        const { id_paciente, nombres, apellidos, identificacion } = req.query;

        try {
            const filter = new patientFilter(
                id_paciente || null,
                nombres || null,
                apellidos || null,
                identificacion || null
            );

            console.log("Ingresamos al controlador (read) con traceId: " + idRequest);

            const resultadoUseCase = await this.patientQueryUsesCase.read(filter);

            return res.status(200).json({
                estado: "ok",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    post: "/patients",
                    patch: "/patients",
                    delete: "/patients"
                }
            });

        } catch (error) {
            return res.status(500).json({
                traceId: idRequest,
                error: "Ocurrió un error al obtener el paciente: " + error.message,
                enlaces: { post: "/patients" }
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
            const dtoPaciente = new patientDTO(datos);
            console.log("Ingresamos al controlador (update) con traceId: " + idRequest + " | Paciente ID: " + dtoPaciente.getId_paciente());

            const resultadoUseCase = await this.patientCommandUsesCase.update(dtoPaciente);

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
                    enlaces: { get: "/patients" }
                });
            }

            return res.status(200).json({
                mensaje: "Paciente actualizado correctamente",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/patients",
                    delete: "/patients"
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
                enlaces: { get: "/patients" }
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
            const dtoPaciente = new patientDTO(datos);
            console.log("Ingresamos al controlador (delete) con traceId: " + idRequest + " | Paciente ID: " + dtoPaciente.getId_paciente());

            const resultadoUseCase = await this.patientCommandUsesCase.delete(dtoPaciente);

            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                const status = resultadoUseCase.resultado.includes("no encontrad") ? 404 : 400;
                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/patients" }
                });
            }

            return res.status(200).json({
                mensaje: "Petición recibida correctamente",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/patients",
                    post: "/patients"
                }
            });

        } catch (error) {
            const message = error.message || "";
            const status = error.statusCode || (message.includes("no encontrad") ? 404 : 400);

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/patients" }
            });
        }
    };
}