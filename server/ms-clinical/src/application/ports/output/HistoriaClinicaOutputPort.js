/**
 * HistoriaClinicaOutputPort.js — Puerto de Salida para HistoriaClinica
 *
 * Contrato que debe implementar cualquier adaptador de persistencia
 * de historia_clinica.
 */
export default class HistoriaClinicaOutputPort {

    guardar(historia) {
        throw new Error('[HistoriaClinicaOutputPort] Método guardar() no implementado');
    }

    listar(filtros) {
        throw new Error('[HistoriaClinicaOutputPort] Método listar() no implementado');
    }

    buscarPorId(id) {
        throw new Error('[HistoriaClinicaOutputPort] Método buscarPorId() no implementado');
    }

    buscarPorPaciente(idPaciente) {
        throw new Error('[HistoriaClinicaOutputPort] Método buscarPorPaciente() no implementado');
    }

    eliminar(id) {
        throw new Error('[HistoriaClinicaOutputPort] Método eliminar() no implementado');
    }
}
