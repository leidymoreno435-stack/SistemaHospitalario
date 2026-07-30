import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const DetalleFacturaModel = sequelize.define("detalle_factura", {
    id_detalle_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    id_factura: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(12,2),
        
        allowNull: true
    }
}, {
    tableName: "detalle_factura",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default DetalleFacturaModel;
