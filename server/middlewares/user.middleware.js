const UserModel = require("../models/user-model")
const { redisController } = require('../controllers')
const bcrypt = require("bcrypt");
const { client } = require("../controllers/redisControllers");
const createUser = async (req, res, next) => {
    const user = new UserModel({
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, Number(process.env.ROUNDS)),
        email: req.body.email,
    })
    await user.save();
    client.HSET(`user:${user.name}`, 'userId', user._id.toString())
    next()
}

const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        const sendableData = users.filter(user => user.verified).map(user => ({ name: user.name, _id: user._id}));
        res.send({ users: sendableData });
    }catch(err){
        res.send({ message: err.message });
    }
    
}

const verifyEmail = async (req, res) => {
    const email = req.query.email;
    const user = await UserModel.findOne({
        email
    })
    user.verified = true;
    await user.save();
    res.status(200).send({ message: "Email verified", status: true });
}

module.exports = {
    createUser,
    verifyEmail,
    getAllUser
}