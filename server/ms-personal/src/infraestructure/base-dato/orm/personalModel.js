import { DataTypes } from "sequelize";
import sequelize from "../postgres.js";

const PersonalModel = sequelize.define(
    "personal",
    {
        id_personal: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombres: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },

        apellidos: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },

        identificacion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        id_especialidad: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        telefono: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },

        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        creado_en: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: "personal",
        schema: "public",
        timestamps: false,
        freezeTableName: true
    }
);

export { sequelize };
export default PersonalModel;