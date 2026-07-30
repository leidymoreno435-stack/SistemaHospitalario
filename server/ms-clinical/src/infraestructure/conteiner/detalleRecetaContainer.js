import detalleRecetaPgsCommandAdapter from "../adapter-output/command/detalleRecetaPgsCommandAdapter.js";
import detalleRecetaPgsQueryAdapter from "../adapter-output/query/detalleRecetaPgsQueryAdapter.js";
import detalleRecetaCommandUsesCase from "../../application/uses-case/command/detalleRecetaCommandUsesCase.js";
import detalleRecetaQueryUsesCase from "../../application/uses-case/query/detalleRecetaQueryUsesCase.js";
import detalleRecetaController from "../adapter-input/detalleRecetaController.js";

const commandAdapter = new detalleRecetaPgsCommandAdapter();
const queryAdapter = new detalleRecetaPgsQueryAdapter();
const commandUseCase = new detalleRecetaCommandUsesCase(commandAdapter);
const queryUseCase = new detalleRecetaQueryUsesCase(queryAdapter);

export const detalleRecetaContainer = new detalleRecetaController(commandUseCase, queryUseCase);
