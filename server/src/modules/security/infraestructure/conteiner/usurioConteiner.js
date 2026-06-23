import usuarioQueryOutput from "../../../../application/ports/output/query/usuarioQueryOutput.js";
import usuarioCommandOutput from "../../../../application/ports/output/command/usuarioCommandOutput.js";
import UsuarioMYSQLCommandAdapter from "../adapter-output/command/UsuarioMYSQLCommandAdapter.js";
import UsuarioMYSQLQueryAdaptador from "../adapter-output/query/UsuarioMYSQLQueryAdapter.js";
import UCommandCaso from "../../../aplication/uses-cases/command/UsuarioCommandUsesCase.js";
import UQueryCaso from "../../../aplication/uses-cases/query/usuarioQueryUsesCase.js";
import UsuarioController from "../adapter-input/usuarioController.js";

const usuarioCommandPgsBDSalida = new UsuarioMYSQLCommandAdaptador();
const usuarioQueryPgsBDSalida = new UsuarioMYSQLQueryAdaptador();

const casoUsoCommandUsuario = new UCommandCaso(usuarioCommandPgsBDSalida);
const casoUsoQueryUsuario = new UQueryCaso(usuarioQueryPgsBDSalida);

const usuarioController = new UsuarioController(casoUsoCommandUsuario, casoUsoQueryUsuario);

export { usuarioController };