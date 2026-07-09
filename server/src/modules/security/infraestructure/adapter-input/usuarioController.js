import usuarioDTO from "../../application/DTO/usuarioDTO.js";
import usuarioInputPort from "../../application/ports/input/usuarioInput.js";

export default class usuarioController extends usuarioInputPort {
    constructor(usuarioCommandUsesCase, usuarioQueryUsesCase) {
        super();
        this.usuarioCommandUsesCase = usuarioCommandUsesCase;
        this.usuarioQueryUsesCase = usuarioQueryUsesCase;
    }

    create = async(req, res) => {

        const idRequest = req.traceId;
        const datos = req.body;
        if (req.headers.accept && !req.headers.accept.includes('application/json')) {
            return res.status(400).json({
                error: "El encabezado Accept debe incluir application/json"
            });
        }

        const dtoUsu = new usuarioDTO(datos)

        console.log("Ingresamos al controlador con: " + idRequest + dtoUsu.getUsername());

        const resultado = await this.usuarioCommandUsesCase.create(dtoUsu);
        res.status(200).json({
            traceId: idRequest,
            resultado: resultado,
            enlaces: {
                patch: `/usuarios/${resultado}`,
                get: `/usuarios/${resultado}`,
            }
        });
    };

    read = async(req, res) => {
        const resultado = await this.usuarioQueryUsesCase.read();
        res.status(200).json({
            estado: 'ok',
            resultado: resultado,
            enlaces: {
                post: `/usuarios`,
                patch: `/usuarios`,
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
        const dtoUsu = new usuarioDTO(datos)
        console.log("Ingresamos al controlador con: " + idRequest + dtoUsu.getUsername());
        const resultado = await this.usuarioCommandUsesCase.delete(dtoUsu);
        res.status(200).json({
            mensaje: 'Petición recibida correctamente',
            traceId: idRequest,
            resultado: resultado,
            enlaces: {
                get: `/usuarios/${resultado}`,
            }
        });
    };


}