const express = require('express');
const router = express.Router();
const {User,Todo} = require("../models")
const userRoutes = require("./userRoutes");
const todoRoutes = require("./todoRoutes")

router.get("/",(req,res)=>{
    res.render("home")
})

router.get("/joe",(req,res)=>{
    res.render("joe")
})

router.use("/api/users",userRoutes);
router.use("/api/todos",todoRoutes);

router.get("/sessiondata",(req,res)=>{
    res.json(req.session)
})

router.get("/favcolor/:color",(req,res)=>{
    req.session.favColor=req.params.color;
    res.send("session updated!")
})

router.get("/secretclub",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    } else {
        res.render("secretclub",{
            username:req.session.user.username
        })  
    }
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        res.redirect("/profile")
    } else {
        res.render("login")
    }
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    } else {
        User.findByPk(req.session.user.id,{
            include:[Todo]
        }).then(dbUser=>{
            const hbsUser = dbUser.toJSON()
            console.log('hbsUsers: ',hbsUser)
            res.render("profile",hbsUser)  
        })
    }
})

module.exports = router;