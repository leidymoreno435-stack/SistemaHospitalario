import { DataTypes } from 'sequelize';
import sequelize from '../../../../infraestructure/database/postgreSQL.js';

const personalModel = sequelize.define('personal', {
    id_personal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cedula: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    tableName: 'personal_medico',
    timestamps: false
});

export default personalModel;
