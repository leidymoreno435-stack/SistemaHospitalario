import consultaDTO from "../../application/DTO/consultaDTO.js";
import consultaInput from "../../application/ports/input/consultaInput.js";
import consultaFilter from "../../domain/filters/consultaFilter.js";

// Función auxiliar para desempaquetar 'resultado' anidado desde capas inferiores
const desempaquetar = (data) => {
    let actual = data;
    while (actual && typeof actual === 'object' && 'resultado' in actual && actual.resultado !== null) {
        actual = actual.resultado;
    }
    return actual;
};

export default class consultaController extends consultaInput {
    constructor(consultaCommandUseCase, consultaQueryUseCase) {
        super();
        this.consultaCommandUseCase = consultaCommandUseCase;
        this.consultaQueryUseCase = consultaQueryUseCase;
    }

    // CREATE (POST)
    create = async(req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        try {
            const dtoConsulta = new consultaDTO(datos);
            console.log("Ingresamos al controlador (create) con traceId: " + idRequest + " | Paciente ID: " + dtoConsulta.getId_paciente());

            const resultadoUseCase = await this.consultaCommandUseCase.create(dtoConsulta);

            // Si el caso de uso/adaptador retorna estado: "error"
            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                const status = resultadoUseCase.resultado.includes("Ya existe") ? 409 : 400;
                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/consultas" }
                });
            }

            return res.status(201).json({
                estado: "ok",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/consultas",
                    patch: "/consultas",
                    delete: "/consultas"
                }
            });

        } catch (error) {
            const message = error.message || "";
            const status = error.statusCode || (message.includes("Ya existe") ? 409 : 400);

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/consultas" }
            });
        }
    };

    // READ (GET)
    read = async(req, res) => {
        const idRequest = req.traceId;
        const { id_paciente, id_medico, id_consultorio, estado, fecha_programada } = req.query;

        try {
            const filter = new consultaFilter(
                id_paciente || null,
                id_medico || null,
                id_consultorio || null,
                estado || null,
                fecha_programada || null
            );

            console.log("Ingresamos al controlador (read) con traceId: " + idRequest);

            const resultadoUseCase = await this.consultaQueryUseCase.read(filter);

            return res.status(200).json({
                estado: "ok",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    post: "/consultas",
                    patch: "/consultas",
                    delete: "/consultas"
                }
            });

        } catch (error) {
            return res.status(500).json({
                traceId: idRequest,
                error: "Ocurrió un error al obtener las consultas: " + error.message,
                enlaces: { post: "/consultas" }
            });
        }
    };

    // UPDATE (PATCH)
    update = async(req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        try {
            const dtoConsulta = new consultaDTO(datos);
            console.log("Ingresamos al controlador (update) con traceId: " + idRequest + " | Consulta ID: " + dtoConsulta.getId_consulta());

            const resultadoUseCase = await this.consultaCommandUseCase.update(dtoConsulta);

            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                let status = 400;
                if (resultadoUseCase.resultado.includes("no encontrada")) {
                    status = 404;
                } else if (resultadoUseCase.resultado.includes("Ya existe")) {
                    status = 409; // 👈 Soporte para conflicto de horarios al actualizar
                }

                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/consultas" }
                });
            }

            return res.status(200).json({
                mensaje: "Consulta actualizada correctamente",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/consultas",
                    delete: "/consultas"
                }
            });

        } catch (error) {
            const message = error.message || "";
            let status = error.statusCode || 400;

            if (message.includes("no encontrada")) {
                status = 404;
            } else if (message.includes("Ya existe")) {
                status = 409; // 👈 Captura en el bloque catch
            }

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/consultas" }
            });
        }
    };

    // DELETE (DELETE)
    delete = async(req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        try {
            const dtoConsulta = new consultaDTO(datos);
            console.log("Ingresamos al controlador (delete) con traceId: " + idRequest + " | Consulta ID: " + dtoConsulta.getId_consulta());

            const resultadoUseCase = await this.consultaCommandUseCase.delete(dtoConsulta);

            if (resultadoUseCase && resultadoUseCase.estado === "error") {
                const status = resultadoUseCase.resultado.includes("no encontrada") ? 404 : 400;
                return res.status(status).json({
                    traceId: idRequest,
                    error: resultadoUseCase.resultado,
                    enlaces: { get: "/consultas" }
                });
            }

            return res.status(200).json({
                mensaje: "Petición recibida correctamente",
                traceId: idRequest,
                resultado: desempaquetar(resultadoUseCase),
                enlaces: {
                    get: "/consultas",
                    post: "/consultas"
                }
            });

        } catch (error) {
            const message = error.message || "";
            const status = error.statusCode || (message.includes("no encontrada") ? 404 : 400);

            return res.status(status).json({
                traceId: idRequest,
                error: message,
                enlaces: { get: "/consultas" }
            });
        }
    };
}