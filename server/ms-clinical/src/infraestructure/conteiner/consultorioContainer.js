import consultorioPgsCommandAdapter from "../adapter-output/command/consultorioPgsCommandAdapter.js";
import consultorioPgsQueryAdapter from "../adapter-output/query/consultorioPgsQueryAdapter.js";
import consultorioCommandUsesCase from "../../application/uses-case/command/consultorioCommandUsesCase.js";
import consultorioQueryUsesCase from "../../application/uses-case/query/consultorioQueryUsesCase.js";
import consultorioController from "../adapter-input/consultorioController.js";

const commandAdapter = new consultorioPgsCommandAdapter();
const queryAdapter = new consultorioPgsQueryAdapter();
const commandUseCase = new consultorioCommandUsesCase(commandAdapter);
const queryUseCase = new consultorioQueryUsesCase(queryAdapter);

export const consultorioContainer = new consultorioController(commandUseCase, queryUseCase);
