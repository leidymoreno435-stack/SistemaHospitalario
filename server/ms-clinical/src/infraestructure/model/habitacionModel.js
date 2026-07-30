import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const HabitacionModel = sequelize.define("habitacion", {
    id_habitacion: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    codigo: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    piso: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "habitacion",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default HabitacionModel;
