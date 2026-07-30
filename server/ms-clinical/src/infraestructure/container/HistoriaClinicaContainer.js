/**
 * HistoriaClinicaContainer.js — Contenedor de Inyección de Dependencias para HistoriaClinica
 *
 * Cadena construida:
 *   HistoriaClinicaControlador
 *     ← HistoriaClinicaCommandUseCase ← HistoriaClinicaPgsCommandAdapter
 *     ← HistoriaClinicaQueryUseCase   ← HistoriaClinicaPgsQueryAdapter
 */
import HistoriaClinicaPgsCommandAdapter from '../adapter-output/command/HistoriaClinicaPgsCommandAdapter.js';
import HistoriaClinicaPgsQueryAdapter   from '../adapter-output/query/HistoriaClinicaPgsQueryAdapter.js';
import HistoriaClinicaCommandUseCase    from '../../application/uses-cases/command/HistoriaClinicaCommandUseCase.js';
import HistoriaClinicaQueryUseCase      from '../../application/uses-cases/query/HistoriaClinicaQueryUseCase.js';
import { HistoriaClinicaControlador }   from '../adapter-input/HistoriaClinicaControlador.js';

const historiaCommandAdapter = new HistoriaClinicaPgsCommandAdapter();
const historiaQueryAdapter   = new HistoriaClinicaPgsQueryAdapter();

const historiaCommandUseCase = new HistoriaClinicaCommandUseCase(historiaCommandAdapter);
const historiaQueryUseCase   = new HistoriaClinicaQueryUseCase(historiaQueryAdapter);

const historiaClinicaControlador = new HistoriaClinicaControlador(historiaCommandUseCase, historiaQueryUseCase);

export { historiaClinicaControlador };
