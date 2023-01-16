const express= require("express");
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const userSchema= require("../modelSchema/user")
const { body, validationResult } = require('express-validator');


const router= express.Router();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.post("/register",[
    body("name").isAlphanumeric(),
    body("email").isEmail(),
    body("password").isLength({min:6, max:16})
],async (req, res)=>{

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
        }

        const {name, email, password}= req.body;

        //checking email already exists
        const AEuser= await userSchema.findOne({email});
        if(AEuser){
            return res.status(404).json({
                status:"Failed",
                message:"User already exists"
            })
        }

        bcrypt.hash(password, 10, async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                return res.status(400).json({
                    status:"Failed"
                })
            }

            const User= await userSchema.create({
                name,
                email,
                password: hash
            });

            return res.status(200).json({
                status:"Success",
                result: User
            })


        });

    } catch (error) {
        res.status(400).json({
            status:"Failed",
            message:error.message
        })
    }
})

module.exports= router;