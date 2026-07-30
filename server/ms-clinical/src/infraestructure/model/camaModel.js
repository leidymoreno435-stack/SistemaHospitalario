import { DataTypes } from "sequelize";
import sequelize from "../database/postgres.js";

const CamaModel = sequelize.define("cama", {
    id_cama: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true,
        allowNull: true
    },
    id_habitacion: {
        type: DataTypes.INTEGER,
        
        allowNull: true
    },
    numero: {
        type: DataTypes.STRING,
        
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        
        allowNull: true
    }
}, {
    tableName: "cama",
    schema: "public",
    timestamps: false,
    freezeTableName: true
});

export { sequelize };
export default CamaModel;
