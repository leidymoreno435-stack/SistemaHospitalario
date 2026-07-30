import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const HistoriaClinicaModel = sequelize.define("historia_clinica", {
    id_historia: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_consulta: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_ingreso: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    resumen: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    anotaciones: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        
        allowNull: true
    }
}, {
    tableName: "historia_clinica",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default HistoriaClinicaModel;
