import { Model, DataTypes } from "sequelize";

export class Logs extends Model {}

Logs.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    user_id: { type: DataTypes.INTEGER, allowNull: true },

    action: { type: DataTypes.STRING(255), allowNull: false },

    method: { type: DataTypes.STRING(10), allowNull: false },

    endpoint: { type: DataTypes.STRING(255), allowNull: false },

    request_body: { type: DataTypes.JSON, allowNull: true },
    response_body: { type: DataTypes.JSON, allowNull: true },

    status_code: { type: DataTypes.INTEGER, allowNull: false },

    ip_address: { type: DataTypes.STRING(50), allowNull: true }
  },
  {
    sequelize: require("../database").sequelize,
    tableName: "logs",
    timestamps: true,
    underscored: true,
  }
);

export default Logs;
