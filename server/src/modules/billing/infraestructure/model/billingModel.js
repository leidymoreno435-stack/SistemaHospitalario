import { DataTypes } from 'sequelize';
import sequelize from '../../../../infraestructure/database/postgreSQL.js';
import patientModel from '../../patients/infraestructure/model/patientModel.js';

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
        allowNull: false,
        references: { model: patientModel, key: 'id_paciente' }
    }
}, {
    tableName: 'facturacion',
    timestamps: false
});

patientModel.hasMany(billingModel, { foreignKey: 'id_paciente' });
billingModel.belongsTo(patientModel, { foreignKey: 'id_paciente' });

export default billingModel;
