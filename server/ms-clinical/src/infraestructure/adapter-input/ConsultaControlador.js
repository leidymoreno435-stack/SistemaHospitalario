/**
 * ConsultaControlador.js — Adaptador de Entrada (Input Adapter) para Consulta
 *
 * Responsabilidad: Recibir peticiones HTTP, construir DTOs, invocar casos de uso
 *                  y devolver respuestas JSON con códigos HTTP correctos.
 *
 * Patrón: Input Adapter (Arquitectura Hexagonal) / Controller (MVC).
 * Principio SOLID:
 *   - SRP: Solo maneja HTTP in/out. No tiene lógica de negocio.
 *   - DIP: Depende de los casos de uso (abstracciones), no de Sequelize.
 *
 * Flujo:
 *   HTTP Request → ConsultaControlador → ConsultaDTO
 *                → ConsultaCommandUseCase / ConsultaQueryUseCase
 *                → Puerto → Adapter → Sequelize → PostgreSQL
 *                → Response JSON
 */
import { ConsultaDTO } from '../../application/DTOs/ConsultaDTO.js';

export class ConsultaControlador {

    /**
     * @param {ConsultaCommandUseCase} casoUsoCommand
     * @param {ConsultaQueryUseCase}   casoUsoQuery
     */
    constructor(casoUsoCommand, casoUsoQuery) {
        this.casoUsoCommand = casoUsoCommand;
        this.casoUsoQuery   = casoUsoQuery;
    }

    // ─── GET /api/v1/consultas ─────────────────────────────────────────────
    listar = async (req, res) => {
        try {
            const filtros = {
                id_paciente: req.query.id_paciente ? parseInt(req.query.id_paciente) : undefined,
                id_medico:   req.query.id_medico   ? parseInt(req.query.id_medico)   : undefined,
                estado:      req.query.estado       || undefined
            };
            const resultado = await this.casoUsoQuery.listar(filtros);
            return res.status(200).json({ estado: 'ok', total: resultado.length, data: resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };

    // ─── GET /api/v1/consultas/:id ─────────────────────────────────────────
    buscarPorId = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ estado: 'error', mensaje: 'El id debe ser un número entero' });
            }
            const resultado = await this.casoUsoQuery.buscarPorId(id);
            if (!resultado) {
                return res.status(404).json({ estado: 'error', mensaje: 'Consulta no encontrada' });
            }
            return res.status(200).json({ estado: 'ok', data: resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };

    // ─── POST /api/v1/consultas ────────────────────────────────────────────
    crear = async (req, res) => {
        try {
            // Validaciones de campos obligatorios (capa de entrada)
            const { id_paciente, id_medico, motivo } = req.body;
            if (!id_paciente || !id_medico || !motivo) {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'Campos obligatorios: id_paciente, id_medico, motivo'
                });
            }
            if (typeof id_paciente !== 'number' || typeof id_medico !== 'number') {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'id_paciente e id_medico deben ser números enteros'
                });
            }
            if (typeof motivo !== 'string' || motivo.trim().length === 0) {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'El campo motivo no puede estar vacío'
                });
            }
            if (req.body.estado && !['programada', 'realizada', 'cancelada'].includes(req.body.estado)) {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'Estado inválido. Valores permitidos: programada | realizada | cancelada'
                });
            }

            const dto = new ConsultaDTO(req.body);
            const resultado = await this.casoUsoCommand.crear(dto);
            return res.status(201).json({ estado: 'ok', resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };

    // ─── PUT /api/v1/consultas/:id ─────────────────────────────────────────
    actualizar = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ estado: 'error', mensaje: 'El id debe ser un número entero' });
            }
            if (Object.keys(req.body).length === 0) {
                return res.status(400).json({ estado: 'error', mensaje: 'Debe enviar al menos un campo a actualizar' });
            }
            if (req.body.estado && !['programada', 'realizada', 'cancelada'].includes(req.body.estado)) {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'Estado inválido. Valores permitidos: programada | realizada | cancelada'
                });
            }

            const dto = new ConsultaDTO(req.body);
            const resultado = await this.casoUsoCommand.actualizar(id, dto);

            if (resultado.estado === 'error') {
                return res.status(404).json(resultado);
            }
            return res.status(200).json({ estado: 'ok', resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };

    // ─── DELETE /api/v1/consultas/:id ──────────────────────────────────────
    eliminar = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ estado: 'error', mensaje: 'El id debe ser un número entero' });
            }

            const resultado = await this.casoUsoCommand.eliminar(id);

            if (resultado.estado === 'error') {
                return res.status(404).json(resultado);
            }
            return res.status(200).json({ estado: 'ok', resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };
}
