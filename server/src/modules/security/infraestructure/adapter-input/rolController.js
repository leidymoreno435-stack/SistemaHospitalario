import rolDTO from "../../application/DTO/rolDTO.js";
import rolInputPort from "../../application/ports/input/rolInputport.js";

export default class rolController extends rolInputPort {
    constructor(rolCommandUsesCase, rolQueryUsesCase) {
        super();
        this.rolCommandUsesCase = rolCommandUsesCase;
        this.rolQueryUsesCase = rolQueryUsesCase;
    }

    create = async(req, res) => {

        const idRequest = req.traceId;
        const datos = req.body;
        if (req.headers.accept && !req.headers.accept.includes('application/json')) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        const dtoRol = new rolDTO(datos)

        console.log("Ingresamos al controlador con: " + idRequest + dtoRol.getNombre());

        const resultado = await this.rolCommandUsesCase.create(dtoRol);
        res.status(200).json({
            traceId: idRequest,
            resultado: resultado,
            enlaces: {
                patch: `/roles/${resultado}`,
                get: `/roles/${resultado}`,
            }
        });
    };

    read = async(req, res) => {
        const resultado = await this.rolQueryUsesCase.read();
        res.status(200).json({
            estado: 'ok',
            resultado: resultado,
            enlaces: {
                post: `/roles`,
                patch: `/roles ${resultado}`,
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
        const dtoRol = new rolDTO(datos)
        console.log("Ingresamos al controlador con: " + idRequest + dtoRol.getNombre());
        const resultado = await this.rolCommandUsesCase.delete(dtoRol);
        res.status(200).json({
            mensaje: 'Petición recibida correctamente',
            traceId: idRequest,
            resultado: resultado,
            enlaces: {
                get: `/roles/${resultado}`,
            }
        });
    };


}