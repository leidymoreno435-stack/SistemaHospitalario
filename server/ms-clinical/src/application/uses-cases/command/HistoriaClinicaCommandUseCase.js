/**
 * HistoriaClinicaCommandUseCase.js — Caso de Uso de Comandos para HistoriaClinica
 *
 * Responsabilidad: Crear y eliminar registros de historia clínica.
 * Patrón: Command Use Case.
 * Principio: DIP — depende del puerto abstracto, no de Sequelize.
 */
import HistoriaClinica from '../../../domain/entities/HistoriaClinica.js';
import HistoriaClinicaOutputPort from '../../ports/output/HistoriaClinicaOutputPort.js';

export default class HistoriaClinicaCommandUseCase {

    /**
     * @param {HistoriaClinicaOutputPort} adaptadorSalida
     */
    constructor(adaptadorSalida) {
        this.adaptadorSalida = adaptadorSalida;
    }

    /**
     * Crea un nuevo registro de historia clínica.
     * Valida con la regla de negocio de la entidad.
     */
    async crear(dto) {
        const historia = new HistoriaClinica(
            null,
            dto.getIdPaciente(),
            dto.getIdConsulta(),
            dto.getIdIngreso(),
            dto.getResumen(),
            dto.getAnotaciones(),
            new Date()
        );

        if (!historia.esValida()) {
            throw new Error('La historia clínica requiere id_paciente y resumen válidos');
        }

        const resultado = await this.adaptadorSalida.guardar(historia);
        return resultado;
    }

    /**
     * Elimina un registro de historia clínica por ID.
     */
    async eliminar(id) {
        const resultado = await this.adaptadorSalida.eliminar(id);
        return resultado;
    }
}
