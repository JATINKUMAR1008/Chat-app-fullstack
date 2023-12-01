const Router = require('express')
const {userMiddleware} = require('../middlewares')
const {authController} = require('../controllers')
const userRouter = Router();

userRouter.post('/',userMiddleware.createUser,authController.createAuthToken);
userRouter.get('/',userMiddleware.getAllUser)
userRouter.get('/verify-email',userMiddleware.verifyEmail);

module.exports = userRouter