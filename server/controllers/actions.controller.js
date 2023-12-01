const { createClient } = require("redis");
const { client } = require("./redisControllers")

const addFriend = (userId, friendId) => {
    client.sAdd(
        `userId:${userId}`, friendId
    )
}
const reteriveFriends = async (userId) => {

    console.log("userId", userId);
    const friends = [];

    // Use a Promise-based approach for async/await with client.sMembers
    const data = await new Promise((resolve, reject) => {
        client.sMembers(`userId:${userId}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                console.log("data", data);
                resolve(data);
            }
        });
    });

    friends.push(...data); // Use push to add elements to the friends array

    console.log(friends);
    return friends;
}

const checkChannelExists = async (data) => {
    const channel = `chat:${data.receiver}:${data.sender}`
    const bool = await new Promise((resolve, reject) => {
        client.exists(channel, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
    console.log(bool)
    return (bool)
}

const createChannel = async (userId, receiverId) => {
    console.log("userId", userId);
    console.log("receiverId", receiverId);
    const channel = await new Promise((resolve, reject) => {
        client.hGet(userId, `${receiverId}`, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        }
    )})
    if(channel){
        console.log("channel", channel)
        return channel
    }
    else{
        const channel = await new Promise((resolve, reject) => {
            client.hGet(receiverId, `${userId}`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }
        )})
        if(channel){
            console.log("channel", channel)
            return channel
        }
        else{
            const channel = `chat:${userId}:${receiverId}`
            client.hSet(userId, `${receiverId}`, channel)
            return channel
        }
    }
}
module.exports = { addFriend, reteriveFriends, checkChannelExists, createChannel }