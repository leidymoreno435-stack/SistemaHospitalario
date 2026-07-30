/**
 * ConsultaPgsQueryAdapter.js — Adaptador de Salida para queries de Consulta
 *
 * Responsabilidad: Implementar las operaciones de LECTURA sobre la tabla `consulta`
 *                  usando Sequelize.
 *
 * Patrón: Adapter (Hexagonal) + Repository Read (CQRS).
 * Principio SOLID: SRP — Solo lectura. Los comandos están en otro adaptador.
 */
import { Op } from 'sequelize';
import ConsultaOutputPort from '../../../application/ports/output/ConsultaOutputPort.js';
import ConsultaTabla from '../../orm/ConsultaTabla.js';

export default class ConsultaPgsQueryAdapter extends ConsultaOutputPort {

    /**
     * Devuelve todas las consultas con filtros opcionales.
     * Filtros soportados: id_paciente, id_medico, estado
     */
    listar = async (filtros = {}) => {
        const where = {};

        if (filtros.id_paciente) where.id_paciente = filtros.id_paciente;
        if (filtros.id_medico)   where.id_medico   = filtros.id_medico;
        if (filtros.estado)      where.estado       = filtros.estado;

        const consultas = await ConsultaTabla.findAll({
            where,
            order: [['creado_en', 'DESC']]
        });

        return consultas;
    };

    /**
     * Busca una consulta por su PK. Retorna null si no existe.
     */
    buscarPorId = async (id) => {
        const consulta = await ConsultaTabla.findByPk(id);
        return consulta;
    };

    // Los métodos de escritura están en el Command Adapter
    guardar()    { throw new Error('Use ConsultaPgsCommandAdapter para guardar'); }
    actualizar() { throw new Error('Use ConsultaPgsCommandAdapter para actualizar'); }
    eliminar()   { throw new Error('Use ConsultaPgsCommandAdapter para eliminar'); }
}
