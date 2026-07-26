import { DataTypes } from 'sequelize';
import sequelize from '../../../../infraestructure/database/postgreSQL.js';

const billingModel = sequelize.define('factura', {
    id_factura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha_emision: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    monto_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    estado: {
        type: DataTypes.STRING(20),
        defaultValue: 'Pendiente' // Pendiente, Pagado, Cancelado
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'factura',
    timestamps: false
});

export default billingModel;