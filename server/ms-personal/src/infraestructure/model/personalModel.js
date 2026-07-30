import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const PersonalModel = sequelize.define("personal", {
    id_personal: {
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
    identificacion: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_especialidad: {
        type: DataTypes.INTEGER,
        
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
    activo: {
        type: DataTypes.BOOLEAN,
        
        allowNull: true
    },
    creado_en: {
        type: DataTypes.DATE,
        
        allowNull: true
    }
}, {
    tableName: "personal",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default PersonalModel;
