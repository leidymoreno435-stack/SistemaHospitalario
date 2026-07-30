import consultaPgsCommandAdapter from "../adapter-output/command/consultaPgsCommandAdapter.js";
import consultaPgsQueryAdapter from "../adapter-output/query/consultaPgsQueryAdapter.js";
import consultaCommandUsesCase from "../../application/uses-case/command/consultaCommandUsesCase.js";
import consultaQueryUsesCase from "../../application/uses-case/query/consultaQueryUsesCase.js";
import consultaController from "../adapter-input/consultaController.js";

const commandAdapter = new consultaPgsCommandAdapter();
const queryAdapter = new consultaPgsQueryAdapter();
const commandUseCase = new consultaCommandUsesCase(commandAdapter);
const queryUseCase = new consultaQueryUsesCase(queryAdapter);

export const consultaContainer = new consultaController(commandUseCase, queryUseCase);
