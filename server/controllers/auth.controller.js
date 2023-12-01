const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createAuthToken = async(req,res) =>{
    const user = await UserModel.findOne({
        email: req.body.email,
    })
    const {password,...rest} = user._doc;
    const token = jwt.sign({
        user: rest
    },
    process.env.JWT_SECRET,{
        expiresIn: "7 days"
    })
    res.send({token,status:true});
}

const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
            if(err){
                res.send({message: "Unauthorized",status: false})
            }else{
                req.user = data;
                next();
            }
        })
    }else{
        res.send({message: "Unauthorized",status: false})
    }
}

const authUser = async(req,res,next) =>{
    console.log(req.body)
    const email = req.body.email;
    try{
        const user = await UserModel.findOne({
            email
        })
        console.log(email)
        const compare_pass = await bcrypt.compare(req.body.password,user.password);
        if(compare_pass){
            next();
        }else{
            res.send({message: "Unauthorized",status: false})
        }
    }catch(err){
        res.send({message: "Unauthorized",status: false})
    }
    
}


module.exports={
    createAuthToken,
    verifyToken,
    authUser
}