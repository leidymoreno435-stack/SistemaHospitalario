import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const CirugiaModel = sequelize.define("cirugia", {
    id_cirugia: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    id_ingreso: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_quirofano: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_cirujano: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    procedimiento: {
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
    estado: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    notas: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "cirugia",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default CirugiaModel;
