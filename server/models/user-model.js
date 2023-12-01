const { default: mongoose } = require("mongoose");

const User = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    image: String,
    verified: {
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.model("User", User)
module.exports = UserModel