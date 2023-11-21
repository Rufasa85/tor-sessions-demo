const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Todo} = require('../models');

//find all
router.get("/",(req,res)=>{
    User.findAll().then(dbUsers=>{
        res.json(dbUsers)
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})
//find one
router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[Todo]
    }).then(dbUser=>{
        if(!dbUser){
            res.status(404).json({msg:"no such user!"})
        } else{
            res.json(dbUser)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})
//create
router.post("/",(req,res)=>{
    User.create({
        username:req.body.username,
        password:req.body.password
    }).then(newUser=>{
        res.json(newUser)
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})

//login
router.post("/login",(req,res)=>{
    //1. find the user who is trying to login
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            res.status(401).json({msg:"Invalid username/password"})
        } else {
            if(!bcrypt.compareSync(req.body.password,foundUser.password)){
                res.status(401).json({msg:"Invalid username/password"})
            } else {
                res.json(foundUser)
            }
        }
    })
})
//edit
router.put("/:id",(req,res)=>{
    User.update({
        username:req.body.username,
        password:req.body.password
    },{
        where:{
            id:req.params.id
        }
    }).then(editUser=>{
        if(!editUser[0]){
            res.status(404).json({msg:"no such user!"})
        } else{
            res.json(editUser)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})
//delete
router.delete("/:id",(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(delUser=>{
        if(!delUser){
            res.status(404).json({msg:"no such user!"})
        } else{
            res.json(delUser)
        }
    }).catch(err=>{
        res.status(500).json({msg:"oh no!",err})
    })
})

module.exports = router;