import { DataTypes } from 'sequelize';
import sequelize from '../../../../infraestructure/database/postgreSQL.js';

const clinicalModel = sequelize.define('consulta', {
    id_consulta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    motivo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    diagnostico: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(50),
        defaultValue: 'Pendiente'
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_personal: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'consulta',
    timestamps: false
});

export default clinicalModel;