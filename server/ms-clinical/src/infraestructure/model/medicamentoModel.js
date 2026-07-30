import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const MedicamentoModel = sequelize.define("medicamento", {
    id_medicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    nombre_comercial: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    principio_activo: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    presentacion: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(12,2),
        
        allowNull: true
    }
}, {
    tableName: "medicamento",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default MedicamentoModel;
