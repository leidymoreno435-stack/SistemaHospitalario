import personalPgsCommandAdapter from "../adapter-output/command/personalPgsCommandAdapter.js";
import personalPgsQueryAdapter from "../adapter-output/query/personalPgsQueryAdapter.js";
import personalCommandUsesCase from "../../application/uses-case/command/personalCommandUsesCase.js";
import personalQueryUsesCase from "../../application/uses-case/query/personalQueryUsesCase.js";
import personalController from "../adapter-input/personalController.js";

const commandAdapter = new personalPgsCommandAdapter();
const queryAdapter = new personalPgsQueryAdapter();
const commandUseCase = new personalCommandUsesCase(commandAdapter);
const queryUseCase = new personalQueryUsesCase(queryAdapter);

export const personalContainer = new personalController(commandUseCase, queryUseCase);
