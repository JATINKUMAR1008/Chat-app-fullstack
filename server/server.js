const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const userRouter = require('./routes/user.routes')
const { mongoConnector } = require('./controllers');
const authRouter = require('./routes/auth.routes');
const { actionController } = require('./controllers');
const cors = require('cors');

const { Socket } = require('dgram');
const { reteriveFriends } = require('./controllers/actions.controller');
const { client } = require('./controllers/redisControllers');
const { createClient } = require('redis');
require('dotenv').config();
const port = process.env.PORT || 3000;



const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/auth', authRouter);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

io.on("connection", async (socket) => {
    const subClient = client.duplicate();
    const pubClient = client.duplicate();
    await subClient.connect();
    await pubClient.connect();
    console.log("User connected", socket.handshake.query.user_id);

    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
    socket.on('add_friend', (friendId) => {
        console.log('add_friend')
        actionController.addFriend(socket.handshake.query.user_id, friendId)
    })
    if (socket.handshake.query.user_id) {
        const friends = await reteriveFriends(socket.handshake.query.user_id)
        socket.emit('friends', { friends }, (val) => {
            console.log(val)
        })

        socket.on('sendChatMessage', async (message) => {
            const { senderId, receiverId, text } = message;
            const channel = await actionController.createChannel(senderId, receiverId);
            const messageObject = { senderId, text, timestamp: Date.now() };
            console.log(messageObject)
            pubClient.publish(channel, JSON.stringify(messageObject));
            client.lPush(channel, JSON.stringify(messageObject));
        });
        const emitUpdatedChats = async (channel) => {
            const chatHistory = await new Promise((resolve,reject)=>{
                client.lrange(channel, 0, -1, (err, data) => {
                    if (!err) {
                      resolve(data)
                    } else {
                      reject(err)
                    }
                  });
            })
            console.log(chatHistory)
            socket.emit('chatMessage', chatHistory.reverse());
        }
        socket.on('subscribeToChat', async (data) => {
            const channel = await actionController.createChannel(socket.handshake.query.user_id, data);
            const messageListener = async (message, channel) => {
                console.log(`Received message on channel ${channel}: ${message}`);
                emitUpdatedChats(channel)
            };

            // Subscribe to the channel and attach the listener
            subClient.v4.subscribe(channel, messageListener);
            emitUpdatedChats(channel)
        })


    }

})



server.listen(port, async () => {
    await mongoConnector.connection()
    console.log(`Server is running on port ${port}`);
});

module.exports = io

