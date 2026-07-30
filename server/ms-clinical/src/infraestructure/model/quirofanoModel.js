import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const QuirofanoModel = sequelize.define("quirofano", {
    id_quirofano: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    ubicacion: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "quirofano",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default QuirofanoModel;
