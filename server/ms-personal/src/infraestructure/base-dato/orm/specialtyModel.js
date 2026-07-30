import { DataTypes } from "sequelize";
import sequelize from "../postgres.js";

const SpecialtyModel = sequelize.define(
    "especialidad",
    {
        id_especialidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        tableName: "especialidad",
        schema: "public",
        timestamps: false,
        freezeTableName: true
    }
);

export { sequelize };
export default SpecialtyModel;