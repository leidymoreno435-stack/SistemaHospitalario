import { UsuarioControlador } from "../adaptador-entrada/UsuarioControlador.js";
import UsuarioCommandAdaptadorSalida from "../adaptador-salida/command/UsuarioPgsCommandAdaptador.js";
import UsuarioQueryAdaptadorSalida from "../adaptador-salida/query/UsuarioPgsQueryAdaptador.js";

import UCommandCaso from "../../aplicacion/uses-cases/command/UsuarioCommandUsesCase.js"
import UQueryCaso from "../../aplicacion/uses-cases/query/UsuarioQueryUsesCase.js"

const usuarioCommandPgsBDSalida = new UsuarioCommandAdaptadorSalida();
const usuarioQueryPgsBDSalida = new UsuarioQueryAdaptadorSalida();

const casoUsoCommandUsuario = new UCommandCaso(usuarioCommandPgsBDSalida);
const casoUsoQueryUsuario = new UQueryCaso(usuarioQueryPgsBDSalida);

const usuarioControlador = new UsuarioControlador(casoUsoCommandUsuario, casoUsoQueryUsuario);

export { usuarioControlador }