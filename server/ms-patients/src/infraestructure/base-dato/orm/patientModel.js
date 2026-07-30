import { DataTypes } from "sequelize";
import sequelize from "../postgres.js";

const PatientModel = sequelize.define(
    "paciente",
    {
        id_paciente: {
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

        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        sexo: {
            type: DataTypes.STRING(1),
            allowNull: true,
        },

        identificacion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        telefono: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },

        direccion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        creado_en: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        tableName: "paciente",
        schema: "public",
        timestamps: false,
        freezeTableName: true
    }
);

export { sequelize };
export default PatientModel;