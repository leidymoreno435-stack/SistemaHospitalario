/**
 * ConsultaTabla.js — Modelo ORM de Sequelize para la tabla `consulta`
 *
 * Responsabilidad: Mapear la tabla PostgreSQL `consulta` hacia Sequelize.
 * Patrón: ORM Model (Active Record en Sequelize).
 * Principio SOLID: SRP — Solo se encarga del mapeo relacional.
 *
 * CORRECCIONES vs clinicalModel.js original:
 *   ❌ fecha_hora      → ✅ fecha_programada / fecha_realizacion
 *   ❌ diagnostico     → ✅ observaciones
 *   ❌ id_personal     → ✅ id_medico
 *   ➕ Campos agregados: id_consultorio, tarifa, duracion_min, creado_en
 *   ➕ Estado corregido: ENUM ('programada','realizada','cancelada')
 */
import { DataTypes } from 'sequelize';
import sequelize from '../database/PostgreSQL.js';

const ConsultaTabla = sequelize.define('ConsultaTabla', {
    id_consulta: {
        type:          DataTypes.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
        allowNull:     false,
        field:         'id_consulta'
    },
    id_paciente: {
        type:      DataTypes.INTEGER,
        allowNull: false,
        field:     'id_paciente'
    },
    id_medico: {
        type:      DataTypes.INTEGER,
        allowNull: false,
        field:     'id_medico'
    },
    id_consultorio: {
        type:      DataTypes.INTEGER,
        allowNull: true,
        field:     'id_consultorio'
    },
    motivo: {
        type:      DataTypes.TEXT,
        allowNull: false,
        field:     'motivo'
    },
    observaciones: {
        type:      DataTypes.TEXT,
        allowNull: true,
        field:     'observaciones'
    },
    estado: {
        // La BD usa un tipo ENUM nativo llamado consulta_estado
        type:         DataTypes.ENUM('programada', 'realizada', 'cancelada'),
        defaultValue: 'programada',
        allowNull:    false,
        field:        'estado'
    },
    fecha_programada: {
        type:      DataTypes.DATE,
        allowNull: true,
        field:     'fecha_programada'
    },
    fecha_realizacion: {
        type:      DataTypes.DATE,
        allowNull: true,
        field:     'fecha_realizacion'
    },
    duracion_min: {
        type:      DataTypes.INTEGER,
        allowNull: true,
        field:     'duracion_min'
    },
    tarifa: {
        type:         DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
        allowNull:    true,
        field:        'tarifa'
    },
    creado_en: {
        type:         DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:    true,
        field:        'creado_en'
    }
}, {
    tableName:       'consulta',
    schema:          'public',
    timestamps:      false,
    freezeTableName: true
});

export default ConsultaTabla;
