import { DataTypes } from "sequelize";
import sequelize from "../postgres.js";

const patientModel = sequelize.define("paciente", {
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    nombres: {
        type: DataTypes.STRING(120),
        allowNull: false
    },

    apellidos: {
        type: DataTypes.STRING(120),
        allowNull: false
    },

    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    sexo: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

    identificacion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    telefono: {
        type: DataTypes.STRING(30),
        allowNull: true
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: true
    },

    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    creado_en: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    tableName: "paciente",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default patientModel;