import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const PatientModel = sequelize.define("paciente", {
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    nombres: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    apellidos: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        
        allowNull: true
    },
    sexo: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    identificacion: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    creado_en: {
        type: DataTypes.DATE,
        
        allowNull: true
    }
}, {
    tableName: "paciente",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default PatientModel;
