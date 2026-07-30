import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const ConsultorioModel = sequelize.define("consultorio", {
    id_consultorio: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    codigo: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    piso: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    }
}, {
    tableName: "consultorio",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default ConsultorioModel;
