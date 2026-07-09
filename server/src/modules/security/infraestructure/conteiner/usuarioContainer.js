import UsuarioMYSQLCommandAdapter from "../adapter-output/command/UsuarioMYSQLCommandAdapter.js";
import UsuarioMYSQLQueryAdapter from "../adapter-output/query/UsuarioMYSQLQueryAdapter.js";
import UCommandCaso from "../../application/uses-case/command/usuarioCommandUsesCase.js";
import UQueryCaso from "../../application/uses-case/query/usuarioQueryUsesCase.js";
import UsuarioController from "../adapter-input/usuarioController.js";


const usuarioCommandAdapter = new UsuarioMYSQLCommandAdapter();
const usuarioQueryAdapter = new UsuarioMYSQLQueryAdapter();

const casoUsoCommandUsuario = new UCommandCaso(usuarioCommandAdapter);
const casoUsoQueryUsuario = new UQueryCaso(usuarioQueryAdapter);

const usuarioController = new UsuarioController(casoUsoCommandUsuario, casoUsoQueryUsuario);

export { usuarioController };