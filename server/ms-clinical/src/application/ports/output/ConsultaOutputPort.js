/**
 * ConsultaOutputPort.js — Puerto de Salida (Output Port) para Consulta
 *
 * Responsabilidad: Definir el CONTRATO que todo adaptador de persistencia
 *                  de Consulta DEBE implementar.
 *
 * Patrón: Port (Hexagonal Architecture) / Repository Interface (DDD).
 * Principio SOLID:
 *   - DIP: Los casos de uso dependen de esta abstracción, NO de Sequelize.
 *   - OCP: Podemos cambiar PostgreSQL por MongoDB sin tocar los casos de uso.
 *   - ISP: Separamos comandos (guardar/actualizar/eliminar) de queries (buscar).
 */
export default class ConsultaOutputPort {

    /**
     * Persiste una nueva consulta.
     * @param {Consulta} consulta — Entidad de dominio
     * @returns {Promise<Object>}
     */
    guardar(consulta) {
        throw new Error('[ConsultaOutputPort] Método guardar() no implementado');
    }

    /**
     * Actualiza los datos de una consulta existente.
     * @param {number} id
     * @param {Object} datos
     * @returns {Promise<Object>}
     */
    actualizar(id, datos) {
        throw new Error('[ConsultaOutputPort] Método actualizar() no implementado');
    }

    /**
     * Elimina una consulta por su identificador.
     * @param {number} id
     * @returns {Promise<Object>}
     */
    eliminar(id) {
        throw new Error('[ConsultaOutputPort] Método eliminar() no implementado');
    }

    /**
     * Obtiene todas las consultas con filtros opcionales.
     * @param {Object} filtros
     * @returns {Promise<Array>}
     */
    listar(filtros) {
        throw new Error('[ConsultaOutputPort] Método listar() no implementado');
    }

    /**
     * Busca una consulta por su PK.
     * @param {number} id
     * @returns {Promise<Object|null>}
     */
    buscarPorId(id) {
        throw new Error('[ConsultaOutputPort] Método buscarPorId() no implementado');
    }
}
