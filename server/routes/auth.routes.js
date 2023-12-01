const Router = require('express')
const {authController} = require('../controllers')
const {userMiddleware} = require('../middlewares')
const authRouter = Router()

authRouter.post('/login',authController.authUser,authController.createAuthToken)
authRouter.get('/',authController.verifyToken,(req,res)=>{
    res.send({
        status: true
    })
})
module.exports = authRouter