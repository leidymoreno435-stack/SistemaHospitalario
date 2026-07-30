import specialtyPgsCommandAdapter from "../adapter-output/command/specialtyPgsCommandAdapter.js";
import specialtyPgsQueryAdapter from "../adapter-output/query/specialtyPgsQueryAdapter.js";
import specialtyCommandUsesCase from "../../application/uses-case/command/specialtyCommandUsesCase.js";
import specialtyQueryUsesCase from "../../application/uses-case/query/specialtyQueryUsesCase.js";
import specialtyController from "../adapter-input/specialtyController.js";

const commandAdapter = new specialtyPgsCommandAdapter();
const queryAdapter = new specialtyPgsQueryAdapter();
const commandUseCase = new specialtyCommandUsesCase(commandAdapter);
const queryUseCase = new specialtyQueryUsesCase(queryAdapter);

export const specialtyContainer = new specialtyController(commandUseCase, queryUseCase);
