import historiaClinicaPgsCommandAdapter from "../adapter-output/command/historiaClinicaPgsCommandAdapter.js";
import historiaClinicaPgsQueryAdapter from "../adapter-output/query/historiaClinicaPgsQueryAdapter.js";
import historiaClinicaCommandUsesCase from "../../application/uses-case/command/historiaClinicaCommandUsesCase.js";
import historiaClinicaQueryUsesCase from "../../application/uses-case/query/historiaClinicaQueryUsesCase.js";
import historiaClinicaController from "../adapter-input/historiaClinicaController.js";

const commandAdapter = new historiaClinicaPgsCommandAdapter();
const queryAdapter = new historiaClinicaPgsQueryAdapter();
const commandUseCase = new historiaClinicaCommandUsesCase(commandAdapter);
const queryUseCase = new historiaClinicaQueryUsesCase(queryAdapter);

export const historiaClinicaContainer = new historiaClinicaController(commandUseCase, queryUseCase);
