/**
 * ConsultaQueryUseCase.js — Caso de Uso de Consultas (lectura)
 *
 * Responsabilidad: Orquestar operaciones de lectura de la entidad Consulta.
 * Patrón: Query Use Case (CQRS lite).
 * Principio SOLID: SRP + DIP (depende del puerto, no de Sequelize).
 */
import ConsultaOutputPort from '../../ports/output/ConsultaOutputPort.js';

export default class ConsultaQueryUseCase {

    /**
     * @param {ConsultaOutputPort} adaptadorSalida
     */
    constructor(adaptadorSalida) {
        this.adaptadorSalida = adaptadorSalida;
    }

    /**
     * Lista todas las consultas.
     * Se pueden pasar filtros como { id_paciente, id_medico, estado }.
     */
    async listar(filtros = {}) {
        const resultado = await this.adaptadorSalida.listar(filtros);
        return resultado;
    }

    /**
     * Busca una consulta por su identificador primario.
     */
    async buscarPorId(id) {
        const resultado = await this.adaptadorSalida.buscarPorId(id);
        return resultado;
    }
}
