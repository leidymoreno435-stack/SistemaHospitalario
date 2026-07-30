import quirofanoPgsCommandAdapter from "../adapter-output/command/quirofanoPgsCommandAdapter.js";
import quirofanoPgsQueryAdapter from "../adapter-output/query/quirofanoPgsQueryAdapter.js";
import quirofanoCommandUsesCase from "../../application/uses-case/command/quirofanoCommandUsesCase.js";
import quirofanoQueryUsesCase from "../../application/uses-case/query/quirofanoQueryUsesCase.js";
import quirofanoController from "../adapter-input/quirofanoController.js";

const commandAdapter = new quirofanoPgsCommandAdapter();
const queryAdapter = new quirofanoPgsQueryAdapter();
const commandUseCase = new quirofanoCommandUsesCase(commandAdapter);
const queryUseCase = new quirofanoQueryUsesCase(queryAdapter);

export const quirofanoContainer = new quirofanoController(commandUseCase, queryUseCase);
