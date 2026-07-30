import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const ServicioModel = sequelize.define("servicio", {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    codigo_servicio: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(12,2),
        
        allowNull: true
    }
}, {
    tableName: "servicio",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default ServicioModel;
