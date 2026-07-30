/**
 * ConsultaCommandUseCase.js — Caso de Uso de Comandos para Consulta
 *
 * Responsabilidad: Orquestar las operaciones de escritura (crear, actualizar, eliminar).
 *
 * Patrón: Use Case / Application Service (Clean Architecture).
 * Principio SOLID:
 *   - SRP: Solo orquestra; no persiste ni valida HTTP.
 *   - DIP: Depende de ConsultaOutputPort (abstracción), no de Sequelize.
 *
 * Flujo: Controller → DTO → UseCase → Port → Adapter → Sequelize → BD
 */
import Consulta from '../../../domain/entities/Consulta.js';
import ConsultaOutputPort from '../../ports/output/ConsultaOutputPort.js';

export default class ConsultaCommandUseCase {

    /**
     * @param {ConsultaOutputPort} adaptadorSalida — Inyectado por el contenedor
     */
    constructor(adaptadorSalida) {
        this.adaptadorSalida = adaptadorSalida;
    }

    /**
     * Crea una nueva consulta médica.
     * Aplica las reglas de negocio de la entidad antes de persistir.
     */
    async crear(dto) {
        const consulta = new Consulta(
            null,
            dto.getIdPaciente(),
            dto.getIdMedico(),
            dto.getIdConsultorio(),
            dto.getMotivo(),
            dto.getObservaciones(),
            dto.getEstado(),
            dto.getFechaProgramada(),
            dto.getFechaRealizacion(),
            dto.getDuracionMin(),
            dto.getTarifa(),
            new Date()
        );

        // Regla de negocio: la consulta debe ser válida antes de guardarla
        if (!consulta.esValida()) {
            throw new Error('La consulta no cumple las reglas de negocio requeridas');
        }

        const resultado = await this.adaptadorSalida.guardar(consulta);
        return resultado;
    }

    /**
     * Actualiza una consulta existente.
     * Solo actualiza los campos permitidos; el estado se valida.
     */
    async actualizar(id, dto) {
        const datos = {};

        if (dto.getMotivo()           !== undefined && dto.getMotivo() !== null)
            datos.motivo = dto.getMotivo();
        if (dto.getObservaciones()    !== undefined)
            datos.observaciones = dto.getObservaciones();
        if (dto.getEstado()           !== undefined) {
            if (!Consulta.estadoEsValido(dto.getEstado())) {
                throw new Error(`Estado inválido: ${dto.getEstado()}. Use: programada | realizada | cancelada`);
            }
            datos.estado = dto.getEstado();
        }
        if (dto.getFechaProgramada()  !== undefined)
            datos.fecha_programada = dto.getFechaProgramada();
        if (dto.getFechaRealizacion() !== undefined)
            datos.fecha_realizacion = dto.getFechaRealizacion();
        if (dto.getDuracionMin()      !== undefined)
            datos.duracion_min = dto.getDuracionMin();
        if (dto.getTarifa()           !== undefined)
            datos.tarifa = dto.getTarifa();
        if (dto.getIdConsultorio()    !== undefined)
            datos.id_consultorio = dto.getIdConsultorio();

        const resultado = await this.adaptadorSalida.actualizar(id, datos);
        return resultado;
    }

    /**
     * Elimina una consulta por su ID.
     */
    async eliminar(id) {
        const resultado = await this.adaptadorSalida.eliminar(id);
        return resultado;
    }
}
