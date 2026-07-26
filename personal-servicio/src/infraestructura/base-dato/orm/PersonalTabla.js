import { DataTypes } from "sequelize";
import sequelize from "../Postgresql.js";

const personalTabla = sequelize.define(
    "PersonalTabla", {
        per_codigo: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            field: "per_codigo",
        },

        per_nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "per_nombre",
        },

        per_apellido: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "per_apellido",
        },

        per_identificacion: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "per_identificacion",
        },

        usu_codigo: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "usu_codigo",
        },

        esp_codigo: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "esp_codigo",
        },

        per_telefono: {
            type: DataTypes.STRING,
            field: "per_telefono",
        },

        per_email: {
            type: DataTypes.STRING,
            field: "per_email",
        },

        per_activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: "per_activo",
        },

        per_creado_en: {
            type: DataTypes.DATE,
            field: "per_creado_en",
        },

        deletedAt: {
            type: DataTypes.DATE,
            field: "deletedAt",
        },
    }, {
        tableName: "personal",
        schema: "public",
        timestamps: true,
        paranoid: true,
        deletedAt: "deletedAt",
        freezeTableName: true,
    }
);

export { sequelize };
export default personalTabla;