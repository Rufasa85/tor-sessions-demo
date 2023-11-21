const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Todo extends Model {}

Todo.init({
    // add properites here, ex:
    task:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isComplete:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
},{
    sequelize
});

module.exports=Todo