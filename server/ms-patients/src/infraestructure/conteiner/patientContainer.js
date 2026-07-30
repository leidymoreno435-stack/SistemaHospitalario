import patientPgsCommandAdapter from "../adapter-output/command/patientPgsCommandAdapter.js";
import patientPgsQueryAdapter from "../adapter-output/query/patientPgsQueryAdapter.js";
import patientCommandUsesCase from "../../application/uses-case/command/patientCommandUsesCase.js";
import patientQueryUsesCase from "../../application/uses-case/query/patientQueryUsesCase.js";
import patientController from "../adapter-input/patientController.js";

const commandAdapter = new patientPgsCommandAdapter();
const queryAdapter = new patientPgsQueryAdapter();
const commandUseCase = new patientCommandUsesCase(commandAdapter);
const queryUseCase = new patientQueryUsesCase(queryAdapter);

export const patientContainer = new patientController(commandUseCase, queryUseCase);
