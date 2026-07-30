/**
 * HistoriaClinicaPgsQueryAdapter.js — Adaptador de Queries para HistoriaClinica
 *
 * Responsabilidad: Leer historia_clinica desde PostgreSQL.
 * Patrón: Adapter (Hexagonal).
 */
import HistoriaClinicaOutputPort from '../../../application/ports/output/HistoriaClinicaOutputPort.js';
import HistoriaClinicaTabla from '../../orm/HistoriaClinicaTabla.js';

export default class HistoriaClinicaPgsQueryAdapter extends HistoriaClinicaOutputPort {

    listar = async (filtros = {}) => {
        const where = {};
        if (filtros.id_paciente) where.id_paciente = filtros.id_paciente;
        if (filtros.id_consulta) where.id_consulta = filtros.id_consulta;

        const historias = await HistoriaClinicaTabla.findAll({
            where,
            order: [['fecha_registro', 'DESC']]
        });
        return historias;
    };

    buscarPorId = async (id) => {
        return await HistoriaClinicaTabla.findByPk(id);
    };

    buscarPorPaciente = async (idPaciente) => {
        return await HistoriaClinicaTabla.findAll({
            where: { id_paciente: idPaciente },
            order: [['fecha_registro', 'DESC']]
        });
    };

    guardar()  { throw new Error('Use HistoriaClinicaPgsCommandAdapter'); }
    eliminar() { throw new Error('Use HistoriaClinicaPgsCommandAdapter'); }
}
