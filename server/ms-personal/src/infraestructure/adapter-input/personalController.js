import personalDTO from "../../application/DTO/personalDTO.js";
import personalInputPort from "../../application/ports/input/personalInput.js";

export default class personalController extends personalInputPort {
    constructor(personalCommandUsesCase, personalQueryUsesCase) {
        super();
        this.personalCommandUsesCase = personalCommandUsesCase;
        this.personalQueryUsesCase = personalQueryUsesCase;
    }

    create = async(req, res) => {

        const idRequest = req.traceId;
        const datos = req.body;
        if (req.headers.accept && !req.headers.accept.includes('application/json')) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        const dtoPer = new personalDTO(datos)

        console.log("Ingresamos al controlador con: " + idRequest + dtoPer.getNombres());

        const resultado = await this.personalCommandUsesCase.create(dtoPer);
        res.status(201).json({
            traceId: idRequest,
            resultado: resultado,
            enlaces: {
                patch: `/personal/${resultado}`,
                get: `/personal/${resultado}`,
            }
        });
    };

    read = async(req, res) => {
        const resultado = await this.personalQueryUsesCase.read();
        res.status(200).json({
            estado: 'ok',
            resultado: resultado,
            enlaces: {
                post: `/personal`,
                patch: `/personal`,
            }
        });
    };

    delete = async(req, res) => {
        const idRequest = req.traceId;
        const datos = req.body;
        if (req.headers.accept && !req.headers.accept.includes('application/json')) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }
        const dtoPer = new personalDTO(datos)
        console.log("Ingresamos al controlador con: " + idRequest + dtoPer.getNombres());
        const resultado = await this.personalCommandUsesCase.delete(dtoPer);
        res.status(200).json({
            mensaje: 'Petición recibida correctamente',
            traceId: idRequest,
            resultado: resultado,
            enlaces: {
                get: `/personal/${resultado}`,
            }
        });
    };


}