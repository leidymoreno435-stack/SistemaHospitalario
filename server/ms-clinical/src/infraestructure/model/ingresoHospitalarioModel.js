import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const IngresoHospitalarioModel = sequelize.define("ingreso_hospitalario", {
    id_ingreso: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_cama: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_medico_responsable: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    fecha_ingreso: {
        type: DataTypes.DATE,
        
        allowNull: true
    },
    fecha_alta: {
        type: DataTypes.DATE,
        
        allowNull: true
    },
    motivo_ingreso: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "ingreso_hospitalario",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default IngresoHospitalarioModel;
