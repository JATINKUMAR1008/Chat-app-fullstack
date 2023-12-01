const { default: mongoose } = require("mongoose")

const connection = async() =>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DB Connected")
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports = {
    connection
}