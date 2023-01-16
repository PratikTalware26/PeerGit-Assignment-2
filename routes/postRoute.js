const express= require("express");
const postModel = require("../modelSchema/post");
var bodyParser = require('body-parser')

const router= express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.get("/posts", async (req, res)=>{
    try {
        const posts= await postModel.find();
        return res.status(400).json({
            status:"Success",
            posts: posts
        })

    } catch (error) {
        return res.status(400).json({
            status:"Failed",
            message: error.message
        })
    }
})

router.post("/posts", async (req, res)=>{
    try {
        const posts= await postModel.create({
            title: req.body.title,
            body: req.body.body,
            user: req.user
        })

        return res.status(200).json({
            status:"Success",
            result: posts
        })
        
    } catch (error) {
        return res.status(400).json({
            status:"Failed",
            message: error.message
        })
    }
})

router.put("/posts/:id", async (req, res)=>{
    try {
        const posts= await postModel.findOneAndUpdate({_id:req.params.id}, req.body);

        return res.status(200).json({
            status:"Success",
            result: posts
        })
        
    } catch (error) {
        return res.status(400).json({
            status:"Failed",
            message: error.message
        })
    }
})

router.delete("/posts/:id", async (req, res)=>{
    try {
        const posts= await postModel.findByIdAndDelete({_id:req.params.id});

        return res.status(200).json({
            status:"Success",
            result: posts
        })
        
    } catch (error) {
        return res.status(400).json({
            status:"Failed",
            message: error.message
        })
    }
})

module.exports= router;