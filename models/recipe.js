import dbconn from "../config/dbconn.js";
import { DataTypes } from "sequelize";

const recipe = dbconn.define("recipe", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    difficulty: {
        type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
        allowNull: false
    },
    ingredients: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    instructions: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    r_description: {
        type: DataTypes.STRING(2000),
        allowNull: true // Assuming this can be optional
    },
    r_time: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.BLOB, // For storing binary data
        allowNull: true // Assuming this can be optional
    },
    r_type: {
        type: DataTypes.ENUM('Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Snack'),
        allowNull: false
    }
}, {
    tableName: 'recipe', // Use 'recipe' as the table name
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default recipe;