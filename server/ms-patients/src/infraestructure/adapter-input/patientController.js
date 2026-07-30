import patientDTO from "../../application/DTO/patientDTO.js";
import patientInputPort from "../../application/ports/input/patientInput.js";

export default class patientController extends patientInputPort {
    constructor(patientCommandUseCase, patientQueryUseCase) {
        super();
        this.patientCommandUseCase = patientCommandUseCase;
        this.patientQueryUseCase = patientQueryUseCase;
    }

    create = async (req, res) => {

        const idRequest = req.traceId;
        const datos = req.body;

        if (req.headers.accept && !req.headers.accept.includes("application/json")) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        const dtoPatient = new patientDTO(datos);

        console.log("Ingresamos al controlador con: " + idRequest + " " + dtoPatient.getNombres());

        const resultado = await this.patientCommandUseCase.create(dtoPatient);

        res.status(201).json({
            traceId: idRequest,
            resultado,
            enlaces: {
                get: "/patients",
                delete: "/patients"
            }
        });
    };

    read = async (req, res) => {

        const resultado = await this.patientQueryUseCase.read();

        res.status(200).json({
            estado: "ok",
            resultado,
            enlaces: {
                post: "/patients",
                delete: "/patients"
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

        const dtoPatient = new patientDTO(datos);

        console.log("Ingresamos al controlador con: " + idRequest);

        const resultado = await this.patientCommandUseCase.delete(dtoPatient);

        res.status(200).json({
            mensaje: "Petición recibida correctamente",
            traceId: idRequest,
            resultado,
            enlaces: {
                get: "/patients"
            }
        });
    };
}