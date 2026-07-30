/**
 * ConsultaPgsCommandAdapter.js — Adaptador de Salida para comandos de Consulta
 *
 * Responsabilidad: Implementar ConsultaOutputPort usando Sequelize + PostgreSQL.
 *                  Es el único lugar donde Sequelize aparece para escrituras.
 *
 * Patrón: Adapter (Hexagonal) + Repository (DDD).
 * Principio SOLID:
 *   - LSP: Implementa completamente el contrato del puerto.
 *   - DIP: Los casos de uso solo ven el puerto; nunca este archivo.
 *
 * Flujo: UseCase → Port → [ESTE ARCHIVO] → Sequelize → PostgreSQL
 */
import { Transaction } from 'sequelize';
import ConsultaOutputPort from '../../../application/ports/output/ConsultaOutputPort.js';
import ConsultaTabla from '../../orm/ConsultaTabla.js';
import sequelize from '../../database/PostgreSQL.js';

export default class ConsultaPgsCommandAdapter extends ConsultaOutputPort {

    /**
     * Inserta una nueva consulta en la BD con transacción.
     */
    guardar = async (consulta) => {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            const nueva = await ConsultaTabla.create({
                id_paciente:      consulta.getIdPaciente(),
                id_medico:        consulta.getIdMedico(),
                id_consultorio:   consulta.getIdConsultorio(),
                motivo:           consulta.getMotivo(),
                observaciones:    consulta.getObservaciones(),
                estado:           consulta.getEstado(),
                fecha_programada: consulta.getFechaProgramada(),
                fecha_realizacion: consulta.getFechaRealizacion(),
                duracion_min:     consulta.getDuracionMin(),
                tarifa:           consulta.getTarifa(),
                creado_en:        new Date()
            }, { transaction });

            await transaction.commit();
            return {
                estado:     'ok',
                resultado:  'Consulta creada exitosamente',
                id:         nueva.id_consulta,
                data:       nueva
            };
        } catch (error) {
            await transaction.rollback();
            throw new Error('Error al guardar consulta: ' + error.message);
        }
    };

    /**
     * Actualiza campos específicos de una consulta.
     */
    actualizar = async (id, datos) => {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            const [filasAfectadas] = await ConsultaTabla.update(datos, {
                where: { id_consulta: id },
                transaction
            });

            if (filasAfectadas === 0) {
                await transaction.rollback();
                return { estado: 'error', resultado: 'Consulta no encontrada' };
            }

            await transaction.commit();
            return { estado: 'ok', resultado: 'Consulta actualizada exitosamente' };
        } catch (error) {
            await transaction.rollback();
            throw new Error('Error al actualizar consulta: ' + error.message);
        }
    };

    /**
     * Elimina una consulta por su PK.
     */
    eliminar = async (id) => {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            const eliminadas = await ConsultaTabla.destroy({
                where: { id_consulta: id },
                transaction
            });

            if (eliminadas === 0) {
                await transaction.rollback();
                return { estado: 'error', resultado: 'Consulta no encontrada' };
            }

            await transaction.commit();
            return { estado: 'ok', resultado: 'Consulta eliminada exitosamente' };
        } catch (error) {
            await transaction.rollback();
            throw new Error('Error al eliminar consulta: ' + error.message);
        }
    };

    // Los métodos de lectura se implementan en el Query Adapter
    listar()     { throw new Error('Use ConsultaPgsQueryAdapter para listar'); }
    buscarPorId() { throw new Error('Use ConsultaPgsQueryAdapter para buscar'); }
}
