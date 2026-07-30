import habitacionPgsCommandAdapter from "../adapter-output/command/habitacionPgsCommandAdapter.js";
import habitacionPgsQueryAdapter from "../adapter-output/query/habitacionPgsQueryAdapter.js";
import habitacionCommandUsesCase from "../../application/uses-case/command/habitacionCommandUsesCase.js";
import habitacionQueryUsesCase from "../../application/uses-case/query/habitacionQueryUsesCase.js";
import habitacionController from "../adapter-input/habitacionController.js";

const commandAdapter = new habitacionPgsCommandAdapter();
const queryAdapter = new habitacionPgsQueryAdapter();
const commandUseCase = new habitacionCommandUsesCase(commandAdapter);
const queryUseCase = new habitacionQueryUsesCase(queryAdapter);

export const habitacionContainer = new habitacionController(commandUseCase, queryUseCase);
