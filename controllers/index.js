const express = require('express');
const router = express.Router();
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
        res.redirect("/secretclub")
    }
    res.render("login")
})

module.exports = router;