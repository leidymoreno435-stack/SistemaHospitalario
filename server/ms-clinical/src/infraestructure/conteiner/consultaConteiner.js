import consultaMYSQLCommandAdapter from "../adapter-output/command/consultaMYSQLCommandAdapter.js";
import consultaMYSQLQueryAdapter from "../adapter-output/query/consultaMYSQLQueryAdapter.js";
import CCommandCaso from "../../application/uses-case/command/consultaCommandUsesCase.js";
import CQueryCaso from "../../application/uses-case/query/consultaQueryUsesCase.js";
import ConsultaControllerClass from "../adapter-input/consultaController.js";

const consultaCommandAdapter = new consultaMYSQLCommandAdapter();
const consultaQueryAdapter = new consultaMYSQLQueryAdapter();

const casoUsoCommandConsulta = new CCommandCaso(consultaCommandAdapter);
const casoUsoQueryConsulta = new CQueryCaso(consultaQueryAdapter);

const consultaController = new ConsultaControllerClass(casoUsoCommandConsulta,casoUsoQueryConsulta);

export { consultaController };