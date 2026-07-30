import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const DetalleRecetaModel = sequelize.define("detalle_receta", {
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    id_receta: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_medicamento: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    dosis: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    indicaciones: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "detalle_receta",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default DetalleRecetaModel;
