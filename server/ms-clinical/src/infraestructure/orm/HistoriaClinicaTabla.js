/**
 * HistoriaClinicaTabla.js — Modelo ORM para la tabla `historia_clinica`
 *
 * Responsabilidad: Mapear la tabla PostgreSQL `historia_clinica` hacia Sequelize.
 * Columnas según BD-TEXTO.sql:
 *   id_historia, id_paciente, id_consulta, id_ingreso, resumen, anotaciones, fecha_registro
 */
import { DataTypes } from 'sequelize';
import sequelize from '../database/PostgreSQL.js';

const HistoriaClinicaTabla = sequelize.define('HistoriaClinicaTabla', {
    id_historia: {
        type:          DataTypes.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
        allowNull:     false,
        field:         'id_historia'
    },
    id_paciente: {
        type:      DataTypes.INTEGER,
        allowNull: false,
        field:     'id_paciente'
    },
    id_consulta: {
        type:      DataTypes.INTEGER,
        allowNull: true,       // nullable: puede ser de un ingreso hospitalario
        field:     'id_consulta'
    },
    id_ingreso: {
        type:      DataTypes.INTEGER,
        allowNull: true,       // nullable: puede ser de una consulta ambulatoria
        field:     'id_ingreso'
    },
    resumen: {
        type:      DataTypes.TEXT,
        allowNull: false,      // NOT NULL en la BD
        field:     'resumen'
    },
    anotaciones: {
        type:      DataTypes.TEXT,
        allowNull: true,
        field:     'anotaciones'
    },
    fecha_registro: {
        type:         DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:    true,
        field:        'fecha_registro'
    }
}, {
    tableName:       'historia_clinica',
    schema:          'public',
    timestamps:      false,
    freezeTableName: true
});

export default HistoriaClinicaTabla;
