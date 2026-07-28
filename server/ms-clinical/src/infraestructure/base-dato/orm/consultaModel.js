import { DataTypes } from "sequelize";
import sequelize from "../postgres.js";

const consultaModel = sequelize.define("consulta", {
    id_consulta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_medico: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_consultorio: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    motivo: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    estado: {
        type: DataTypes.ENUM("PROGRAMADA", "ATENDIDA", "CANCELADA"),
        allowNull: false,
        defaultValue: "PROGRAMADA"
    },

    fecha_programada: {
        type: DataTypes.DATE,
        allowNull: false
    },

    fecha_realizacion: {
        type: DataTypes.DATE,
        allowNull: true
    },

    duracion_min: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    tarifa: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true
    },

    creado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

}, {
    tableName: "consulta",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default consultaModel;