/**
 * HistoriaClinicaPgsCommandAdapter.js — Adaptador de Salida para comandos de HistoriaClinica
 *
 * Responsabilidad: Implementar guardar y eliminar sobre la tabla `historia_clinica`.
 * Patrón: Adapter (Hexagonal) + Repository.
 */
import { Transaction } from 'sequelize';
import HistoriaClinicaOutputPort from '../../../application/ports/output/HistoriaClinicaOutputPort.js';
import HistoriaClinicaTabla from '../../orm/HistoriaClinicaTabla.js';
import sequelize from '../../database/PostgreSQL.js';

export default class HistoriaClinicaPgsCommandAdapter extends HistoriaClinicaOutputPort {

    guardar = async (historia) => {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            const nuevo = await HistoriaClinicaTabla.create({
                id_paciente:    historia.getIdPaciente(),
                id_consulta:    historia.getIdConsulta(),
                id_ingreso:     historia.getIdIngreso(),
                resumen:        historia.getResumen(),
                anotaciones:    historia.getAnotaciones(),
                fecha_registro: new Date()
            }, { transaction });

            await transaction.commit();
            return {
                estado:    'ok',
                resultado: 'Historia clínica creada exitosamente',
                id:        nuevo.id_historia,
                data:      nuevo
            };
        } catch (error) {
            await transaction.rollback();
            throw new Error('Error al guardar historia clínica: ' + error.message);
        }
    };

    eliminar = async (id) => {
        const transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });

        try {
            const eliminadas = await HistoriaClinicaTabla.destroy({
                where: { id_historia: id },
                transaction
            });

            if (eliminadas === 0) {
                await transaction.rollback();
                return { estado: 'error', resultado: 'Historia clínica no encontrada' };
            }

            await transaction.commit();
            return { estado: 'ok', resultado: 'Historia clínica eliminada exitosamente' };
        } catch (error) {
            await transaction.rollback();
            throw new Error('Error al eliminar historia clínica: ' + error.message);
        }
    };

    listar()           { throw new Error('Use HistoriaClinicaPgsQueryAdapter'); }
    buscarPorId()      { throw new Error('Use HistoriaClinicaPgsQueryAdapter'); }
    buscarPorPaciente(){ throw new Error('Use HistoriaClinicaPgsQueryAdapter'); }
}
