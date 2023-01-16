const express= require("express")
const router= express.Router();
const User= require("../modelSchema/user")
const bcrypt = require('bcrypt');
const secret= "userid"
var jwt = require('jsonwebtoken');


const { body, validationResult } = require('express-validator');

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())


router.post("/login",[
    body("email").isEmail(),
    body("password").isLength({min: 6, max:16})
], async (req, res)=>{
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {email, password}= req.body;

        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                status:"Failed",
                message:"Please input valid credentials or register"
            })
        }

        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(err){
                return res.status(400).json({
                    status:"Failed",
                    message: err
                })
            }
            if(!result){
                return res.json({
                    status:"Failed",
                    message:"Incorrect password"
                })
            }
            if(result){
                const token= jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);

                return res.status(200).json({
                    status:"success",
                    result:"Login Successfully",
                    token: token
                })
            }
        });
        
    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message
        })
    }
})

module.exports= router;