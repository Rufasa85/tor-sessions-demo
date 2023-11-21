const Todo =require("./Todo");
const User = require("./User");

Todo.belongsTo(User,{
    onDelete:'CASCADE'
});
User.hasMany(Todo)

module.exports = {
    User,
    Todo
}