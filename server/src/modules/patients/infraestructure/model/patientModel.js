import { DataTypes } from 'sequelize';
import sequelize from '../../../../infraestructure/database/postgreSQL.js';

const patientModel = sequelize.define('paciente', {
    id_paciente: {
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
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'pacientes',
    timestamps: false
});

export default patientModel;
