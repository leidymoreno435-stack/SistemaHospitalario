import examenPgsCommandAdapter from "../adapter-output/command/examenPgsCommandAdapter.js";
import examenPgsQueryAdapter from "../adapter-output/query/examenPgsQueryAdapter.js";
import examenCommandUsesCase from "../../application/uses-case/command/examenCommandUsesCase.js";
import examenQueryUsesCase from "../../application/uses-case/query/examenQueryUsesCase.js";
import examenController from "../adapter-input/examenController.js";

const commandAdapter = new examenPgsCommandAdapter();
const queryAdapter = new examenPgsQueryAdapter();
const commandUseCase = new examenCommandUsesCase(commandAdapter);
const queryUseCase = new examenQueryUsesCase(queryAdapter);

export const examenContainer = new examenController(commandUseCase, queryUseCase);
