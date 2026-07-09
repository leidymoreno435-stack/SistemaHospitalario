import { DataTypes } from 'sequelize';
import sequelize from '../../../../infraestructure/database/postgreSQL.js';
import patientModel from '../../patients/infraestructure/model/patientModel.js';
import personalModel from '../../personal/infraestructure/model/personalModel.js';

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
        allowNull: false,
        references: { model: patientModel, key: 'id_paciente' }
    },
    id_personal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: personalModel, key: 'id_personal' }
    }
}, {
    tableName: 'consultas_clinicas',
    timestamps: false
});

// Relaciones
patientModel.hasMany(clinicalModel, { foreignKey: 'id_paciente' });
clinicalModel.belongsTo(patientModel, { foreignKey: 'id_paciente' });

personalModel.hasMany(clinicalModel, { foreignKey: 'id_personal' });
clinicalModel.belongsTo(personalModel, { foreignKey: 'id_personal' });

export default clinicalModel;
