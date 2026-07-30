import medicamentoPgsCommandAdapter from "../adapter-output/command/medicamentoPgsCommandAdapter.js";
import medicamentoPgsQueryAdapter from "../adapter-output/query/medicamentoPgsQueryAdapter.js";
import medicamentoCommandUsesCase from "../../application/uses-case/command/medicamentoCommandUsesCase.js";
import medicamentoQueryUsesCase from "../../application/uses-case/query/medicamentoQueryUsesCase.js";
import medicamentoController from "../adapter-input/medicamentoController.js";

const commandAdapter = new medicamentoPgsCommandAdapter();
const queryAdapter = new medicamentoPgsQueryAdapter();
const commandUseCase = new medicamentoCommandUsesCase(commandAdapter);
const queryUseCase = new medicamentoQueryUsesCase(queryAdapter);

export const medicamentoContainer = new medicamentoController(commandUseCase, queryUseCase);
