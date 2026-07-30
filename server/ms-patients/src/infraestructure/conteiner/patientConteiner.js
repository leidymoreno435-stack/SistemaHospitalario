import PatientMYSQLCommandAdapter from "../adapter-output/command/patientMYSQLCommandAdapter.js";
import PatientMYSQLQueryAdapter from "../adapter-output/query/patientMYSQLQueryAdapter.js";
import PCommandCaso from "../../application/uses-case/command/patientCommandUsesCase.js";
import PQueryCaso from "../../application/uses-case/query/patientQueryUsesCase.js";
import PatientController from "../adapter-input/patientController.js";

const patientCommandAdapter = new PatientMYSQLCommandAdapter();
const patientQueryAdapter = new PatientMYSQLQueryAdapter();

const casoUsoCommandPatient = new PCommandCaso(patientCommandAdapter);
const casoUsoQueryPatient = new PQueryCaso(patientQueryAdapter);

const patientController = new PatientController(casoUsoCommandPatient,casoUsoQueryPatient);

export { patientController };