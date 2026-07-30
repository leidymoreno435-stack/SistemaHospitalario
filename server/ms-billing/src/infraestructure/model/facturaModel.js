import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const FacturaModel = sequelize.define("factura", {
    id_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    numero_factura: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    fecha_emision: {
        type: DataTypes.DATE,
        
        allowNull: true
    },
    total: {
        type: DataTypes.DECIMAL(14,2),
        
        allowNull: true
    },
    estado_pago: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "factura",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default FacturaModel;
