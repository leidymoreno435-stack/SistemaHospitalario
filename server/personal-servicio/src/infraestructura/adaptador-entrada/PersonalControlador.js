import { PersonalDTO } from '../../aplicacion/dto/PesonalDTO.js';
import PersonalEntradaPort from "../../aplicacion/puertos/entrada/PersonalEntradaPuerto.js"
import { Buffer } from 'buffer'
import zlib from 'zlib'

export class PersonalControlador extends PersonalEntradaPort {
    constructor(casoUsoCommand, CasoUsoQuery) {
        super();
        this.casoUsoCommandUsuario = casoUsoCommand;
        this.casoUsoQueryUsuario = CasoUsoQuery;
    }

    crear = async(req, res) => {

        const idRequest = req.traceId;
        const datos = req.body;

        const dtoUsu = new PersonalDTO(datos)

        console.log("Ingresamos al controlador con: " + idRequest + dtoUsu.getNombre());

        const resultado = await this.casoUsoCommandPersonal.crear(dtoUsu);


        res.status(200).json({
            traceId: idRequest,
            resultadoJSON: resultado,
            enlaces: {
                patch: `/personal/${await resultado.resultado.id}`
            }
        });
    }

    lista = async(req, res) => {

        const resultado = await this.casoUsoQueryUsuario.lista();
        res.status(200).json({
            estado: "ok",
            resultado: resultado
        });
    }
    eliminar = async(req, res) => {
        const idRequest = req.traceId;
        const dtoUsu = new UsuarioDTO({ id: req.params.id })

        const resultado = await this.casoUsoCommandUsuario.eliminar(dtoUsu);
        res.status(200).json({
            estado: "ok",
            resultado: resultado
        });
    }
}