import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const SpecialtyModel = sequelize.define("especialidad", {
    id_especialidad: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "especialidad",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default SpecialtyModel;
