const redis = require('redis')
const client = redis.createClient({legacyMode: true})

client.connect()

client.on('error',(err)=>{
    console.log(err)
})

module.exports={
    client,
}