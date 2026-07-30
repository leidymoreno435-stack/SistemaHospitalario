import servicioPgsCommandAdapter from "../adapter-output/command/servicioPgsCommandAdapter.js";
import servicioPgsQueryAdapter from "../adapter-output/query/servicioPgsQueryAdapter.js";
import servicioCommandUsesCase from "../../application/uses-case/command/servicioCommandUsesCase.js";
import servicioQueryUsesCase from "../../application/uses-case/query/servicioQueryUsesCase.js";
import servicioController from "../adapter-input/servicioController.js";

const commandAdapter = new servicioPgsCommandAdapter();
const queryAdapter = new servicioPgsQueryAdapter();
const commandUseCase = new servicioCommandUsesCase(commandAdapter);
const queryUseCase = new servicioQueryUsesCase(queryAdapter);

export const servicioContainer = new servicioController(commandUseCase, queryUseCase);
