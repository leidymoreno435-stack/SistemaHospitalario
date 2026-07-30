/**
 * ConsultaContainer.js — Contenedor de Inyección de Dependencias para Consulta
 *
 * Responsabilidad: Instanciar y conectar todos los componentes de la cadena
 *                  hexagonal para el módulo de Consulta.
 *
 * Patrón: Composition Root (DI) + Factory.
 * Principio SOLID: DIP — Las dependencias se inyectan aquí; ninguna clase
 *                  las construye internamente.
 *
 * Cadena construida:
 *   ConsultaControlador
 *     ← ConsultaCommandUseCase ← ConsultaPgsCommandAdapter ← ConsultaTabla ← PostgreSQL
 *     ← ConsultaQueryUseCase   ← ConsultaPgsQueryAdapter  ← ConsultaTabla ← PostgreSQL
 */
import ConsultaPgsCommandAdapter from '../adapter-output/command/ConsultaPgsCommandAdapter.js';
import ConsultaPgsQueryAdapter   from '../adapter-output/query/ConsultaPgsQueryAdapter.js';
import ConsultaCommandUseCase    from '../../application/uses-cases/command/ConsultaCommandUseCase.js';
import ConsultaQueryUseCase      from '../../application/uses-cases/query/ConsultaQueryUseCase.js';
import { ConsultaControlador }   from '../adapter-input/ConsultaControlador.js';

// ─── 1. Adaptadores de salida (acceso a BD) ──────────────────────────────────
const consultaCommandAdapter = new ConsultaPgsCommandAdapter();
const consultaQueryAdapter   = new ConsultaPgsQueryAdapter();

// ─── 2. Casos de uso (orquestación de negocio) ───────────────────────────────
const consultaCommandUseCase = new ConsultaCommandUseCase(consultaCommandAdapter);
const consultaQueryUseCase   = new ConsultaQueryUseCase(consultaQueryAdapter);

// ─── 3. Controlador (adaptador de entrada HTTP) ───────────────────────────────
const consultaControlador = new ConsultaControlador(consultaCommandUseCase, consultaQueryUseCase);

export { consultaControlador };
