import { DataTypes } from 'sequelize';
import sequelize from '../Postgresql.js';

const rolModel = sequelize.define('rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    delete_at: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    tableName: 'rol',
    schema: 'public',
    timestamps: true,
    deletedAt: 'delete_at',
    freezeTableName: true,
    paranoid: true
});
export { sequelize };
export default rolModel;