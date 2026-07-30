import facturaPgsCommandAdapter from "../adapter-output/command/facturaPgsCommandAdapter.js";
import facturaPgsQueryAdapter from "../adapter-output/query/facturaPgsQueryAdapter.js";
import facturaCommandUsesCase from "../../application/uses-case/command/facturaCommandUsesCase.js";
import facturaQueryUsesCase from "../../application/uses-case/query/facturaQueryUsesCase.js";
import facturaController from "../adapter-input/facturaController.js";

const commandAdapter = new facturaPgsCommandAdapter();
const queryAdapter = new facturaPgsQueryAdapter();
const commandUseCase = new facturaCommandUsesCase(commandAdapter);
const queryUseCase = new facturaQueryUsesCase(queryAdapter);

export const facturaContainer = new facturaController(commandUseCase, queryUseCase);
