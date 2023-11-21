const sequelize= require("../config/connection");
const {User,Todo} = require("../models")
const userData = [
    {
        username:"joejoejoe",
        password:"password"
    },
    {
        username:"bashiva theCats",
        password:"meowmeow"
    }
]

const todoData = [
    {
        task:"Teach class",
        UserId:1
    },
    {
        task:"take a nap",
        UserId:2
    },
    {
        task:"be cute",
        UserId:2
    }
]

const seedMe = async()=>{
    await sequelize.sync({force:true});
    await User.bulkCreate(userData,{
        individualHooks:true
    });
    await Todo. bulkCreate(todoData);
    console.log("seeded!")
    process.exit(0);
}

seedMe();