import SpecialtyMYSQLCommandAdapter from "../adapter-output/command/specialtyMYSQLCommandAdapter.js";
import SpecialtyMYSQLQueryAdapter from "../adapter-output/query/specialtyMYSQLQueryAdapter.js";
import SCommandCaso from "../../application/uses-case/command/specialtyCommandUsesCase.js";
import SQueryCaso from "../../application/uses-case/query/specialtyQueryUsesCase.js";
import SpecialtyController from "../adapter-input/specialtyController.js";

const specialtyCommandAdapter = new SpecialtyMYSQLCommandAdapter();
const specialtyQueryAdapter = new SpecialtyMYSQLQueryAdapter();

const casoUsoCommandSpecialty = new SCommandCaso(specialtyCommandAdapter);
const casoUsoQuerySpecialty = new SQueryCaso(specialtyQueryAdapter);

const specialtyController = new SpecialtyController(casoUsoCommandSpecialty, casoUsoQuerySpecialty);

export { specialtyController };