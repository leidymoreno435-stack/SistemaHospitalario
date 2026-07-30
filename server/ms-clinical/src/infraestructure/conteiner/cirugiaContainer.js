import cirugiaPgsCommandAdapter from "../adapter-output/command/cirugiaPgsCommandAdapter.js";
import cirugiaPgsQueryAdapter from "../adapter-output/query/cirugiaPgsQueryAdapter.js";
import cirugiaCommandUsesCase from "../../application/uses-case/command/cirugiaCommandUsesCase.js";
import cirugiaQueryUsesCase from "../../application/uses-case/query/cirugiaQueryUsesCase.js";
import cirugiaController from "../adapter-input/cirugiaController.js";

const commandAdapter = new cirugiaPgsCommandAdapter();
const queryAdapter = new cirugiaPgsQueryAdapter();
const commandUseCase = new cirugiaCommandUsesCase(commandAdapter);
const queryUseCase = new cirugiaQueryUsesCase(queryAdapter);

export const cirugiaContainer = new cirugiaController(commandUseCase, queryUseCase);
