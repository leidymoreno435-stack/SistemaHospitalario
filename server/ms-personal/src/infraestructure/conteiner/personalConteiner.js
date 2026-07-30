import PersonalMYSQLCommandAdapter from "../adapter-output/command/personalMYSQLCommandAdapter.js";
import PersonalMYSQLQueryAdapter from "../adapter-output/query/personalMYSQLQueryAdapter.js";
import PCommandCaso from "../../application/uses-case/command/personalCommandUsesCase.js";
import PQueryCaso from "../../application/uses-case/query/personalQueryUsesCase.js";
import PersonalController from "../adapter-input/personalController.js";

const personalCommandAdapter = new PersonalMYSQLCommandAdapter();
const personalQueryAdapter = new PersonalMYSQLQueryAdapter();

const casoUsoCommandPersonal = new PCommandCaso(personalCommandAdapter);
const casoUsoQueryPersonal = new PQueryCaso(personalQueryAdapter);

const personalController = new PersonalController(casoUsoCommandPersonal, casoUsoQueryPersonal);

export { personalController };