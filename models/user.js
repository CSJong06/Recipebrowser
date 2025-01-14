import dbconn from "../config/dbconn.js";
import { DataTypes } from "sequelize";

// creates the user object model 

const User = dbconn.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash'
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

  }, {
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });


export default User;