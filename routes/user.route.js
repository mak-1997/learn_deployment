const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// Register
userRouter.post("/signup", async (req, res) => {
    const { email, pass, location, age } = req.body;

    try {
        bcrypt.hash(pass, 5, (err, hash) => {
            const user = new UserModel({ email, pass:hash, location, age });
            user.save();
            res.status(200).send({ "msg": "User Registered Successfully" });
        })
    } catch (error) {
        res.status(400).send({ "msg": error.message });
    }
});

// Login
userRouter.post("/login", async(req,res)=>{
    const {email,pass} = req.body;

    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    res.status(200).send({"msg":"Login Successful !!", "token": jwt.sign({"userID": user._id},"signature")});
                }else{
                    res.status(400).send({"msg":"Wrong Credentials !!"});
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }

})


module.exports = {userRouter};
