import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const ExamenModel = sequelize.define("examen", {
    id_examen: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_solicitante: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    tipo_examen: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    fecha_orden: {
        type: DataTypes.DATE,
        
        allowNull: true
    },
    fecha_resultado: {
        type: DataTypes.DATE,
        
        allowNull: true
    },
    resultado: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    adjunto_ruta: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "examen",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default ExamenModel;
