import rolQueryOutput from "../../application/ports/output/query/rolQueryOutput.js";
import rolCommandOutput from "../../application/ports/output/command/rolCommandOutput.js";
import RolMYSQLCommandAdapter from "../adapter-output/command/rolMYSQLCommandAdapter.js";
import RolMYSQLQueryAdapter from "../adapter-output/query/rolMYSQLQueryAdapter.js";
import RCommandCaso from "../../application/uses-case/command/rolCommandUsesCase.js";
import RQueryCaso from "../../application/uses-case/query/rolQueryUsesCase.js";
import RolController from "../adapter-input/rolController.js";

const commandOutput = new RolMYSQLCommandAdapter();
const queryOutput = new RolMYSQLQueryAdapter();

const casoUsoCommandRol = new RCommandCaso(commandOutput);
const casoUsoQueryRol = new RQueryCaso(queryOutput);

const rolController = new RolController(casoUsoCommandRol, casoUsoQueryRol);

export { rolController };