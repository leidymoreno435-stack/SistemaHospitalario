import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const RecetaModel = sequelize.define("receta", {
    id_receta: {
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
    fecha_emision: {
        type: DataTypes.DATE,
        
        allowNull: true
    },
    instrucciones: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "receta",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default RecetaModel;
