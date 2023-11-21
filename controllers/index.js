const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes");
const todoRoutes = require("./todoRoutes")

router.get("/",(req,res)=>{
    res.render("home")
})

router.use("/api/users",userRoutes);
router.use("/api/todos",todoRoutes);

module.exports = router;