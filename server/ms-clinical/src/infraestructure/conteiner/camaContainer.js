import camaPgsCommandAdapter from "../adapter-output/command/camaPgsCommandAdapter.js";
import camaPgsQueryAdapter from "../adapter-output/query/camaPgsQueryAdapter.js";
import camaCommandUsesCase from "../../application/uses-case/command/camaCommandUsesCase.js";
import camaQueryUsesCase from "../../application/uses-case/query/camaQueryUsesCase.js";
import camaController from "../adapter-input/camaController.js";

const commandAdapter = new camaPgsCommandAdapter();
const queryAdapter = new camaPgsQueryAdapter();
const commandUseCase = new camaCommandUsesCase(commandAdapter);
const queryUseCase = new camaQueryUsesCase(queryAdapter);

export const camaContainer = new camaController(commandUseCase, queryUseCase);
