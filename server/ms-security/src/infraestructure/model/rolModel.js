import { DataTypes } from 'sequelize';
import sequelize from '../database/postgres.js';

const rolModel = sequelize.define('rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'rol',
    schema: 'public',
    timestamps: false,
    freezeTableName: true
});
export { sequelize };
export default rolModel;