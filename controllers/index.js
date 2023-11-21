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
        res.status(403).json({msg:"login first to join the club!"})
    } else {
        res.send(`welcome to the club, ${req.session.user.username}!`)  
    }
})

module.exports = router;