import ingresoHospitalarioPgsCommandAdapter from "../adapter-output/command/ingresoHospitalarioPgsCommandAdapter.js";
import ingresoHospitalarioPgsQueryAdapter from "../adapter-output/query/ingresoHospitalarioPgsQueryAdapter.js";
import ingresoHospitalarioCommandUsesCase from "../../application/uses-case/command/ingresoHospitalarioCommandUsesCase.js";
import ingresoHospitalarioQueryUsesCase from "../../application/uses-case/query/ingresoHospitalarioQueryUsesCase.js";
import ingresoHospitalarioController from "../adapter-input/ingresoHospitalarioController.js";

const commandAdapter = new ingresoHospitalarioPgsCommandAdapter();
const queryAdapter = new ingresoHospitalarioPgsQueryAdapter();
const commandUseCase = new ingresoHospitalarioCommandUsesCase(commandAdapter);
const queryUseCase = new ingresoHospitalarioQueryUsesCase(queryAdapter);

export const ingresoHospitalarioContainer = new ingresoHospitalarioController(commandUseCase, queryUseCase);
