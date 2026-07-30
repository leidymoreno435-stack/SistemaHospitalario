import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const ConsultaModel = sequelize.define("consulta", {
    id_consulta: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_medico: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_consultorio: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    motivo: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    observaciones: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    fecha_programada: {
        type: DataTypes.DATE,
        
        allowNull: true
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
        type: DataTypes.DECIMAL(12,2),
        
        allowNull: true
    },
    creado_en: {
        type: DataTypes.DATE,
        
        allowNull: true
    }
}, {
    tableName: "consulta",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default ConsultaModel;
