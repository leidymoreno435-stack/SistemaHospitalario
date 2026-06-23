import rolQueryOutput from "../../../../application/ports/output/query/usuarioQueryOutput.js";
import rolCommandOutput from "../../../../application/ports/output/command/usuarioCommandOutput.js";
import rolMYSQLCommandAdapter from "../adapter-output/command/UsuarioMYSQLCommandAdapter.js";
import rolMYSQLQueryAdaptador from "../adapter-output/query/UsuarioMYSQLQueryAdapter.js";
import RCommandCaso from "../../../aplication/uses-cases/command/UsuarioCommandUsesCase.js";
import RQueryCaso from "../../../aplication/uses-cases/query/UsuarioQueryUsesCase.js";
import rolController from "../adapter-input/rolcOntroller.js";


const rolCommandPgsBDSalida = new rolMYSQLCommandAdaptador();
const rolQueryPgsBDSalida = new rolMYSQLQueryAdaptador();

const casoUsoCommandUsuario = new RCommandCaso(rolCommandPgsBDSalida);
const casoUsoQueryUsuario = new RQueryCaso(rolQueryPgsBDSalida);

const rolController = new rolController(casoUsoCommandUsuario, casoUsoQueryUsuario);

export { rolController };