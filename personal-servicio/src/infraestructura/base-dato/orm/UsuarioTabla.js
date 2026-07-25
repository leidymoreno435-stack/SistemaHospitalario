import { DataTypes } from "sequelize";
import sequelize from "../Postgresql.js";

const usuarioTabla = sequelize.define(
  "UsuarioTabla",
  {
    usu_codigo: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: "usu_codigo",
    },
    usu_nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "usu_nombre",
    },
     deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deletedAt",
    }, 
  },
  {
    tableName: "usuario",
    schema: "public",
    timestamps: true,
    deletedAt :"deletedAt",
    freezeTableName: true,
    paranoid:true
  }
);
export {sequelize};
export default usuarioTabla;