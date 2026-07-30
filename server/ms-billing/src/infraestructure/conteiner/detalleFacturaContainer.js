import detalleFacturaPgsCommandAdapter from "../adapter-output/command/detalleFacturaPgsCommandAdapter.js";
import detalleFacturaPgsQueryAdapter from "../adapter-output/query/detalleFacturaPgsQueryAdapter.js";
import detalleFacturaCommandUsesCase from "../../application/uses-case/command/detalleFacturaCommandUsesCase.js";
import detalleFacturaQueryUsesCase from "../../application/uses-case/query/detalleFacturaQueryUsesCase.js";
import detalleFacturaController from "../adapter-input/detalleFacturaController.js";

const commandAdapter = new detalleFacturaPgsCommandAdapter();
const queryAdapter = new detalleFacturaPgsQueryAdapter();
const commandUseCase = new detalleFacturaCommandUsesCase(commandAdapter);
const queryUseCase = new detalleFacturaQueryUsesCase(queryAdapter);

export const detalleFacturaContainer = new detalleFacturaController(commandUseCase, queryUseCase);
