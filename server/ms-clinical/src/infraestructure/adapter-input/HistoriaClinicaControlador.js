/**
 * HistoriaClinicaControlador.js — Adaptador de Entrada para HistoriaClinica
 *
 * Responsabilidad: Recibir peticiones HTTP para historia_clinica,
 *                  validar datos básicos, construir DTOs e invocar los casos de uso.
 *
 * Patrón: Input Adapter (Hexagonal Architecture).
 * Principio SOLID: SRP — Solo maneja HTTP. No toca Sequelize ni el dominio.
 */
import { HistoriaClinicaDTO } from '../../application/DTOs/HistoriaClinicaDTO.js';

export class HistoriaClinicaControlador {

    /**
     * @param {HistoriaClinicaCommandUseCase} casoUsoCommand
     * @param {HistoriaClinicaQueryUseCase}   casoUsoQuery
     */
    constructor(casoUsoCommand, casoUsoQuery) {
        this.casoUsoCommand = casoUsoCommand;
        this.casoUsoQuery   = casoUsoQuery;
    }

    // ─── GET /api/v1/historial ─────────────────────────────────────────────
    listar = async (req, res) => {
        try {
            const filtros = {
                id_paciente: req.query.id_paciente ? parseInt(req.query.id_paciente) : undefined,
                id_consulta: req.query.id_consulta ? parseInt(req.query.id_consulta) : undefined
            };
            const resultado = await this.casoUsoQuery.listar(filtros);
            return res.status(200).json({ estado: 'ok', total: resultado.length, data: resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };

    // ─── GET /api/v1/historial/:id ─────────────────────────────────────────
    buscarPorId = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ estado: 'error', mensaje: 'El id debe ser un número entero' });
            }
            const resultado = await this.casoUsoQuery.buscarPorId(id);
            if (!resultado) {
                return res.status(404).json({ estado: 'error', mensaje: 'Historia clínica no encontrada' });
            }
            return res.status(200).json({ estado: 'ok', data: resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };

    // ─── GET /api/v1/historial/paciente/:idPaciente ────────────────────────
    buscarPorPaciente = async (req, res) => {
        try {
            const idPaciente = parseInt(req.params.idPaciente);
            if (isNaN(idPaciente)) {
                return res.status(400).json({ estado: 'error', mensaje: 'idPaciente debe ser un número entero' });
            }
            const resultado = await this.casoUsoQuery.buscarPorPaciente(idPaciente);
            return res.status(200).json({ estado: 'ok', total: resultado.length, data: resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };

    // ─── POST /api/v1/historial ────────────────────────────────────────────
    crear = async (req, res) => {
        try {
            const { id_paciente, resumen } = req.body;

            if (!id_paciente || !resumen) {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'Campos obligatorios: id_paciente, resumen'
                });
            }
            if (typeof id_paciente !== 'number') {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'id_paciente debe ser un número entero'
                });
            }
            if (typeof resumen !== 'string' || resumen.trim().length === 0) {
                return res.status(400).json({
                    estado: 'error',
                    mensaje: 'El campo resumen no puede estar vacío'
                });
            }

            const dto = new HistoriaClinicaDTO(req.body);
            const resultado = await this.casoUsoCommand.crear(dto);
            return res.status(201).json({ estado: 'ok', resultado });
        } catch (error) {
            return res.status(500).json({ estado: 'error', mensaje: error.message });
        }
    };

    // ─── DELETE /api/v1/historial/:id ──────────────────────────────────────
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
