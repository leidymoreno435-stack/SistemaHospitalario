/**
 * HistoriaClinicaQueryUseCase.js — Caso de Uso de Queries para HistoriaClinica
 *
 * Responsabilidad: Listar, buscar por ID y buscar por paciente.
 */
import HistoriaClinicaOutputPort from '../../ports/output/HistoriaClinicaOutputPort.js';

export default class HistoriaClinicaQueryUseCase {

    /**
     * @param {HistoriaClinicaOutputPort} adaptadorSalida
     */
    constructor(adaptadorSalida) {
        this.adaptadorSalida = adaptadorSalida;
    }

    async listar(filtros = {}) {
        return await this.adaptadorSalida.listar(filtros);
    }

    async buscarPorId(id) {
        return await this.adaptadorSalida.buscarPorId(id);
    }

    async buscarPorPaciente(idPaciente) {
        return await this.adaptadorSalida.buscarPorPaciente(idPaciente);
    }
}
