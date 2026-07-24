import { DataTypes } from 'sequelize';
import sequelize from '../../../../infraestructure/database/postgreSQL.js';

const UsuarioModel = sequelize.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    delete_at: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    tableName: 'usuarios',
    schema: 'public',
    timestamps: true,
    deletedAt: 'delete_at',
    freezeTableName: true,
    paranoid: true
});
export { sequelize };
export default UsuarioModel;