const express= require("express");
const mongoose= require("mongoose")
const Port= 3000;
const registerRoute= require("./routes/registration");
const loginRoute= require("./routes/loginRoute");
const postRoute= require("./routes/postRoute")
var jwt = require('jsonwebtoken');
const secret= 'userid'


mongoose.connect('mongodb://127.0.0.1:27017/assignment')
  .then(() => console.log('Connected!'));

const app = express();

app.use("/api/posts", (req, res, next)=>{
    try {
        const token= req.headers.authorization;

        if(token){
            jwt.verify(token, secret, function(err, decoded) {
                req.user= decoded.data
                next();
              });
        }else{
            return res.status(400).json({
                status:"Failed",
                message:"Invalid Token"
            })

        }

    } catch (error) {
        return res.status(400).json({
            status:"Failed",
            message:error.message
        })
    }

})

app.get("/",(req, res)=>{
    res.send("Hello")
})
app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", postRoute)
app.listen(Port, ()=>console.log(`App is listening on port ${Port}`))