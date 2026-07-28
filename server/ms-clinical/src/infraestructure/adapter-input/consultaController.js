import consultaDTO from "../../application/DTO/consultaDTO.js";
import consultaInput from "../../application/ports/input/consultaInput.js";
import consultaFilter from "../../domain/filter/consultaFilter.js";

export default class consultaController extends consultaInput {
    constructor(consultaCommandUseCase, consultaQueryUseCase) {
        super();
        this.consultaCommandUseCase = consultaCommandUseCase;
        this.consultaQueryUseCase = consultaQueryUseCase;
    }

    create = async (req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        const dtoConsulta = new consultaDTO(datos);

        console.log("Ingresamos al controlador (create) con traceId: " + idRequest + " | Paciente ID: " + dtoConsulta.getId_paciente());

        const resultado = await this.consultaCommandUseCase.create(dtoConsulta);

        res.status(201).json({
            traceId: idRequest,
            resultado,
            enlaces: {
                get: "/consultas",
                put: "/consultas",
                delete: "/consultas"
            }
        });
    };

    read = async (req, res) => {
        const idRequest = req.traceId;
        const { id_paciente, id_medico, id_consultorio, estado, fecha_programada } = req.query;

        const filter = new consultaFilter(
            id_paciente || null,
            id_medico || null,
            id_consultorio || null,
            estado || null,
            fecha_programada || null
        );

        console.log("Ingresamos al controlador (read) con traceId: " + idRequest);

        const resultado = await this.consultaQueryUseCase.read(filter);

        res.status(200).json({
            estado: "ok",
            traceId: idRequest,
            resultado,
            enlaces: {
                post: "/consultas",
                put: "/consultas",
                delete: "/consultas"
            }
        });
    };

    update = async (req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        const dtoConsulta = new consultaDTO(datos);

        console.log("Ingresamos al controlador (update) con traceId: " + idRequest + " | Consulta ID: " + dtoConsulta.getId_consulta());

        const resultado = await this.consultaCommandUseCase.update(dtoConsulta);

        res.status(200).json({
            mensaje: "Consulta actualizada correctamente",
            traceId: idRequest,
            resultado,
            enlaces: {
                get: "/consultas",
                delete: "/consultas"
            }
        });
    };

    delete = async (req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        const dtoConsulta = new consultaDTO(datos);

        console.log("Ingresamos al controlador (delete) con traceId: " + idRequest + " | Consulta ID: " + dtoConsulta.getId_consulta());

        const resultado = await this.consultaCommandUseCase.delete(dtoConsulta);

        res.status(200).json({
            mensaje: "Petición recibida correctamente",
            traceId: idRequest,
            resultado,
            enlaces: {
                get: "/consultas",
                post: "/consultas"
            }
        });
    };
}