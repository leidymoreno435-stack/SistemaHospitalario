import recetaPgsCommandAdapter from "../adapter-output/command/recetaPgsCommandAdapter.js";
import recetaPgsQueryAdapter from "../adapter-output/query/recetaPgsQueryAdapter.js";
import recetaCommandUsesCase from "../../application/uses-case/command/recetaCommandUsesCase.js";
import recetaQueryUsesCase from "../../application/uses-case/query/recetaQueryUsesCase.js";
import recetaController from "../adapter-input/recetaController.js";

const commandAdapter = new recetaPgsCommandAdapter();
const queryAdapter = new recetaPgsQueryAdapter();
const commandUseCase = new recetaCommandUsesCase(commandAdapter);
const queryUseCase = new recetaQueryUsesCase(queryAdapter);

export const recetaContainer = new recetaController(commandUseCase, queryUseCase);
