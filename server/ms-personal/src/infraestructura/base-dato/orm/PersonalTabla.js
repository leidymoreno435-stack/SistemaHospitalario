import { DataTypes } from "sequelize";
import sequelize from "../Postgresql.js";

const personalTabla = sequelize.define(
    "PersonalTabla", {
        id_personal: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id_personal",
        },

        nombres: {
            type: DataTypes.STRING(120),
            allowNull: false,
            field: "nombres",
        },

        apellidos: {
            type: DataTypes.STRING(120),
            allowNull: false,
            field: "apellidos",
        },

        identificacion: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "identificacion",
        },

        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "id_usuario",
        },

        id_especialidad: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "id_especialidad",
        },

        telefono: {
            type: DataTypes.STRING(30),
            allowNull: true,
            field: "telefono",
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
            field: "email",
        },

        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "activo",
        },

        creado_en: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "creado_en",
        },
    }, {
        tableName: "personal",
        schema: "public",
        timestamps: false,
        freezeTableName: true,
    }
);

export { sequelize };
export default personalTabla;